const db = require("../models")

const Skill = db.skillSet

exports.addSkills = async (skills,surveyId) => {
    skills.forEach(async element => {
       return await Skill.create({
            skillName:element,
            surveyId
        }) 
    });
}