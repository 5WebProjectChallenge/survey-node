const db = require('../models')
// console.log(db)

const Survey = db.survey

function checkEntry(name, number) {
    // we will check for name and number 
    // if got null then entry is invalid

    return !!name || !!number
}

exports.addSurvey = async (req, res) => {
    const { name, edu_lvl, skills, gender, number, email } = req.body

    const isValidEntry = checkEntry(name, number)

    if (isValidEntry) {

        // check if number is not in db
        try {
            const entryWithSameNumber = await survey.findOne({
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
                await User.create({
                    name,
                    edu_lvl,
                    skills,
                    gender,
                    number,
                    email
                })

                res.send({
                    error: false,
                    message: "Entry saved"
                })
            }
        } catch (e) {

            res.status(500)
                .send({
                    error: true,
                    message: "Server error"
                })

        }
    }

}

exports.getSurvey = async (req, res) => {
    try {
        const surveys = await survey.findOne({
            where: {
                number
            }
        })
        res.send({
            error: false,
            message: "Got the data",
            data: surveys
        })

    } catch (e) {

        res.status(500)
            .send({
                error: true,
                message: "Server error"
            })

    }
}