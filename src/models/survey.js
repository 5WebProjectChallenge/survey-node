const survey = (sequelize,DataTypes) => {
    const Survey = sequelize.define(
        'survey',
        {
            id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            name:{
                type:DataTypes.STRING,
            },
            educationLevel:{
                type:DataTypes.STRING,
            },
            skills:{
                type:DataTypes.STRING,
            },
            gender:{
                type:DataTypes.STRING,
            },
            number:{
                type:DataTypes.STRING,
                unique:true

            },
            email:{
                type:DataTypes.STRING,
            }
        },{
            timestapms:true,
            freezeTableName:true
        }
    );

    Survey.sync()
    return Survey 
}

export default survey 
