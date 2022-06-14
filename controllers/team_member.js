const { Team_member } = require('../models')

class TeamMemberController {
  static async addMember(req, res, next) {
    const TeamId = req.params.id
    let memberData = []
    try {
      for (let i=1; i <= 15; i++) {
        if (req.body[`nama_member_${i}`] && req.body[`nama_member_${i}`] !== '') {
          memberData.push({
            nama_member: req.body[`nama_member_${i}`],
            no_wa: req.body[`no_wa_${i}`],
            TeamId
          });
        }
      }
      const newMembers = await Team_member.bulkCreate(memberData);
      res.status(201).json(newMembers);
    }
    catch(err) {
      console.log(err)
    };
  };
}

module.exports = TeamMemberController