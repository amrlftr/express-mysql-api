const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const members = require('../../Members');

// gets all members
router.get('/', (req, res) => res.json(members));

// get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id)); // need to have parseInt because req.params.id return string

    // validate if members with id requested existed, if not, return error json and 404 error status
    if (found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json({ msg: `No member with the ID of ${req.params.id}` });
    }
});

// create member
/* // in POSTMAN...
- select POST
- URL = http://localhost:5000/api/members/
- in Headers, under Key, type 'Content-Type' and under Value, type 'application/json'
- in Body, select 'raw' and paste...
{   
    "name": "Amirul Fitri"
	"email" : "amirulfitri@gmail.com"
}
- Click Send
*/
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    // validate required name and email
    if(!newMember.name || !newMember.name){
        return res.status(400).json({ msg: 'Please include a name and email' });
    }

    members.push(newMember);
    // res.json(members);
    res.redirect('/');
});

// update member
/* // in POSTMAN...
- select PUT
- URL = http://localhost:5000/api/members/1
- in Headers, under Key, type 'Content-Type' and under Value, type 'application/json'
- in Body, select 'raw' and paste...
{   
	"email" : "jontest@gmail.com"
}
- Click Send
*/
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id)); // need to have parseInt because req.params.id return string

    // validate if found then update, if not, return error message and status
    if (found){
        const updateMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                // validate if name or email is sent, sent the new one, if not sent the old one
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;
            }

            res.json({ msg: 'Member updated', member: member });
        });
    }
    else {
        res.status(400).json({ msg: `No member with the ID of ${req.params.id}` });
    }
});

// delete member
/* // in POSTMAN...
- select DELETE
- URL = http://localhost:5000/api/members/1
- in Headers, under Key, type 'Content-Type' and under Value, type 'application/json'
- Click Send
*/
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id)); // need to have parseInt because req.params.id return string

    // validate if members with id requested existed, if not, return error json and 404 error status
    if (found){
        res.json({ 
            msg: 'Member deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    }
    else {
        res.status(400).json({ msg: `No member with the ID of ${req.params.id}` });
    }
});
module.exports = router;