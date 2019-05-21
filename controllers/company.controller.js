module.exports = {
    async create(ctx) {
        try {
            ctx.body = await ctx.db.Company.create({
                name: ctx.request.body.name,
                city: ctx.request.body.city,
                addres: ctx.request.body.address
            })

        } catch (err) {
            ctx.throw(500, err)
        }

    },
    async find(ctx){
        try{
            ctx.body = await ctx.db.Company.findAll({attributes:["id","name"]})
        }catch(err){
            ctx.throw(500,err)
        }
    },
    async findOne(ctx){
        try{
            const company= await ctx.db.Company.findOne({ 
               where:{id:ctx.params.id}
            })

            if(!company){
                ctx.throw(404,"Invalid company")
            }
            ctx.body=company

        }catch(err){
            ctx.throw(500,err)
        }
    },
    async delete(ctx){
        try{
            const result = await ctx.db.Company.destroy({
                where:{id:ctx.params.id}
            })
            result === 0 ? ctx.throw(500,'Invalid number of company'):ctx.body ='Company deleted'
            

        }catch(err){
            ctx.throw(500,err)

        }

    }, async update(ctx){
        try{
            const results = await ctx.db.Company.update({
                name:ctx.request.body.name,
                city: ctx.request.body.city,
                addres: ctx.request.body.address
            },{
                where:{id:ctx.params.id}
            }) 
            results === 0 ? ctx.throw(500,'Invalid number of company'):ctx.body ='Company Updated'

        }catch(err){
            ctx.throw(500,err)
        }
    }
}