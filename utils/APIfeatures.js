const mongoose=require('mongoose');
class APIfeatures{
    constructor(query,requestQueryObject){
        this.query=query;
        this.requestQueryObject=requestQueryObject;
    }
    filter(){
        let queryObj={...this.requestQueryObject};        
        //1)Filtering
        const excludedFields=['page','sort','limit','fields'];
        excludedFields.forEach(el=>delete queryObj[el]);

        //1)a)Advance filtering
        //here we are gonna replace all gt,gte,lt,lte by $gt,$gte,$lt,$lte to make queries with multiple conditions 
        queryObj=JSON.parse(JSON.stringify(queryObj).replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`));
        
        //Forming a query        
        this.query=this.query.find(queryObj);
        return this;
    }
    sort(){
        if(this.requestQueryObject.sort)
            this.query=this.query.sort(this.requestQueryObject.sort.split(',').join(' '));        
        else
            this.query=this.query.sort('createdAt');
        return this;     
    }
    fields(){
        if(this.requestQueryObject.fields)
            this.query=this.query.select(this.requestQueryObject.fields.split(',').join(' '));
        else
            this.query=this.query.select('-__v');
        return this;
    }
    pagingation(){
        const limit=parseInt(this.requestQueryObject.limit)||100,skip=((parseInt(this.requestQueryObject.page)||1)-1)*limit;
        this.query=this.query.skip(skip).limit(limit);
        return this;
    }
}
module.exports=APIfeatures;