const skill = (sequelize,DataTypes) => {
    const Skill = sequelize.define(
        'skillSet',{
            id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            skillName:{
                type:DataTypes.STRING
            },
            surveyId: {
                type:DataTypes.INTEGER
            }
        },{
            timestamps:true,
            freezeTableName:true
        }
    )

    Skill.sync()
    return Skill
}

export default skill