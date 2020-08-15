const Tour = require(`${__dirname}/../models/tourModel`);
const APIfeatures = require(`${__dirname}/../utils/APIfeatures`);
const catchAsyncError = require(`${__dirname}/../utils/catchAsyncError`);
const AppError= require(`${__dirname}/../utils/AppError`);
const factory=require(`${__dirname}/../utils/factoryFunctions`);
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
exports.getAllTours = catchAsyncError(async (request, response, next) => {                     
    const tours = await new APIfeatures(Tour, request.query).filter().sort().fields().pagination().query;    
    response.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });    
});
exports.getTourById =catchAsyncError(async (request, response, next) => {    
    const tour = await Tour.findById(request.params.id);
    if(!tour)
        return next(new AppError('No tour found with that ID',404));
    response.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });            
});
exports.createTour = factory.createOne(Tour);
exports.updateTourById = factory.updateOne(Tour);
exports.deleteTourById = factory.deleteOne(Tour);