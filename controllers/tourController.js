const Tour = require(`${__dirname}/../models/tourModel`);
const catchAsyncError = require(`${__dirname}/../utils/catchAsyncError`);
const factory=require(`${__dirname}/../utils/factoryFunctions`);
const AppError=require(`${__dirname}/../utils/AppError`);
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