exports.index = (req, res) => {
    return res.json(users);
}


exports.show = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id){
        return res.status(400).json({err: 'Incorrect id'});
    }

    let user = users.filter(user => user.id === id)[0];
    if (!user) {
        return res.status(404).json({err: 'Unknown user'});
    }

    return res.json(user);
}

exports.destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if(!id){
        return res.status(400).json({err: 'Incorrect id'});
    }

    const userIdx = users.findIndex(user => user.id === id);
    if (userIdx === -1) {
        return res.status(404).json({err: 'Unknown user'});
    }

    users.splice(userIdx, 1);
    res.status(204).send();
}

exports.create = (req, res) => {
    const name = req.body.name || '';

    if (!name.length) {
        return res.status(400).json({err: 'Incorrect name'});
    }

    const id = users.reduce((maxId, user) => {
        return user.id > maxId ? user.id : maxId;
    }, 0) + 1;

    const newUser = {
        id: id,
        name: name
    };

    users.push(newUser);

    return res.status(201).json(newUser);
}

exports.update = (req, res) => {
    const newName = req.body.name || '';
    const id = parseInt(req.params.id, 10);

    if(!newName.length){
        return res.status(400).json({err: 'Incrrect name'});
    }

    let user = users.filter(user => user.id === id)[0];
    if (!user) {
        return res.status(404).json({err: 'Unknown user'});
    }

    user.name = newName;

    return res.json(user);
}

let users = [
    {
        id: 1,
        name: 'Geon'
    },
    {
        id: 2,
        name: 'Hyebin'
    }
]