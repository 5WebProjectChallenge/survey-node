const db = require('../models')
// console.log(db)
const { Op } = require('sequelize')
const { addSkills } = require('./skill.controller')
// const  Skill = require('../models/skills')

const Survey = db.survey
const Skill = db.skillSet

function checkEntry(name, number) {
    // we will check for name and number 
    // if got null then entry is invalid

    return !!name || !!number
}

exports.addSurvey = async (req, res) => {
    const { name, edu_lvl, skill, gender, number, email } = req.body

    const isValidEntry = checkEntry(name, number)

    if (isValidEntry) {

        // check if number is not in db
        try {
            const entryWithSameNumber = await Survey.findOne({
                where: {
                    number
                }
            })

            if (entryWithSameNumber) {
                res.status(400)
                    .send({
                        error: true,
                        message: "You are not allowed to enter survey again!!!"
                    })
            } else {
                const saved = await Survey.create({
                    name,
                    educationLevel: edu_lvl,
                    gender,
                    number,
                    email
                })

                await addSkills(skill,saved.id)
                
                res.send({
                    error: false,
                    message: "Entry saved"
                })
            }
        } catch (e) {
            console.log(e)
            res.status(500)
                .send({
                    error: true,
                    message: "Server error"
                })

        }
    }

}

exports.getSurvey = async (req, res) => {

    const { from } = req.params
    console.log("from", from)
    try {
        Skill.belongsTo(Survey,{foreignKey:"id"})
        Survey.hasMany(Skill,{foreignKey:"surveyId"})
        
        const surveys = await Survey.findAll({
            where: {
                id: {
                    [Op.lt]: parseInt(from,10)
                }
            },
            include:[Skill],
            order: [["id", "DESC"]],
            limit: 2
        })
        
        res.send({
            error: false,
            message: "Got the data",
            data: surveys
        })

    } catch (e) {
        console.log(e)
        res.status(500)
            .send({
                error: true,
                message: "Server error"
            })

    }
}