const multer=require('multer');
const sharp=require('sharp');
const Tour = require(`${__dirname}/../models/tourModel`);
const catchAsyncError = require(`${__dirname}/../utils/catchAsyncError`);
const factory=require(`${__dirname}/../utils/factoryFunctions`);
const AppError=require(`${__dirname}/../utils/AppError`);


const multerStorage=multer.memoryStorage();//Doing it because we need to resize image thats why we will store img in buffer 
const multerFilter=(request,file,cb)=>{    
    file.mimetype.startsWith('image')?cb(null,true):cb(new AppError('NOT an image,Please upload an image only',404,false));
}
const upload=multer({storage:multerStorage,fileFilter:multerFilter});//initializing oject to upload files and setting path of storage

exports.uploadTourImages=upload.fields([
    {name:'imageCover',maxCount:1},
    {name:'images',maxCount:3}
]);
exports.resizeTourImages=catchAsyncError(async (request,response,next)=>{
    if (!req.files.imageCover || !req.files.images) return next();
    // 1) Cover image
    req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/tours/${req.body.imageCover}`);
  
    // 2) Images
    req.body.images = [];
  
    await Promise.all(
      req.files.images.map(async (file, i) => {
        const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
  
        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/img/tours/${filename}`);
  
        req.body.images.push(filename);
      })
    );    
    //using sharp for resizing img into 500X500,converting into jpeg,compressing it by 10% and then storing it to the disk on the destination
    next();
});
exports.top5ToursAliasFunc = (request, response, next) => {
    request.query.limit = '5';
    request.query.sort = '-ratingsAverage,price';
    request.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}
exports.getTourStats = catchAsyncError(async (request, response, next) => {          
    const year = parseInt(request.params.year);
    const stats = await Tour.aggregate([
        {
            $project: { startDates: 1, name: 1 }
        },
        {
            $unwind: "$startDates"
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: "$startDates" },
                numTours: { $sum: 1 },
                tours: { $push: "$name" }
            }
        },
        {
            $sort: { numTours: -1 }
        }
    ]);
    response.status(200).json({
        status: 'success',
        data: {
            stats
        }
    });
});
exports.getTourWithin=catchAsyncError(async (request,response,next)=>{
    const {distance,latlong,unit}=request.params;
    const [lat,long]=latlong.split(',');
    const radius=unit==='mi'?distance/3963.2:distance/6378.1;    
    if(!lat||!long)
        return next(new AppError('Please provide lattitude and longitude in format lat,lng',404));
    //to query for geospacial data our db must have indexes of that field
    const tours=await Tour.find({
        startLocation:{$geoWithin:{$centerSphere:[[long,lat],radius]}}
    });
    response.status(200).json({
        status:'success',
        results:tours.length,
        data:{
            tours
        }
    });
});
exports.getDistances=catchAsyncError(async (request,response,next)=>{
    const {latlong,unit}=request.params;
    const [lat,long]=latlong.split(',');
    const multiplier=unit==='mi'?0.000621371 :0.001;    
    if(!lat||!long)
        return next(new AppError('Please provide lattitude and longitude in format lat,lng',404));
    //to query for geospacial data our db must have indexes of that field
    const distances=await Tour.aggregate([
        {
            $geoNear:{
                near:{
                    type:'Point',
                    coordinates:[long*1,lat*1],
                },
                distanceField:'distance',
                distanceMultiplier:multiplier
            }
        }
    ]);
    response.status(200).json({
        status:'success',
        results:distances.length,
        data:{
            distances
        }
    });
});
exports.getAllTours = factory.getAll(Tour);
exports.getTourById =factory.getOne(Tour,{path:'reviews'});
exports.createTour = factory.createOne(Tour);
exports.updateTourById = factory.updateOne(Tour);
exports.deleteTourById = factory.deleteOne(Tour);