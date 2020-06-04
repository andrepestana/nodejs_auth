

let posts = []
if (process.env.FAKE_PERSISTENT_DATA) {
    posts = [
        {
        username: 'a@a.com',
        title: 'Post 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc hendrerit lectus id arcu lobortis, eu congue lorem euismod. Nunc aliquam ullamcorper interdum. Fusce diam nibh, accumsan sed sollicitudin a, accumsan sed metus. Donec vestibulum congue lacinia. Mauris odio elit, auctor sed ligula eget, tempor convallis tortor. Nam consectetur ex in elementum auctor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris sodales molestie magna, at vestibulum magna ornare at. Aenean eget ex eros. Pellentesque vel libero id purus semper ullamcorper. Cras eget venenatis est. Quisque venenatis eu est eget mollis. Integer tincidunt at quam eu scelerisque.'
        },
        {
        username: 'a@a.com',
        title: 'Post 2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc hendrerit lectus id arcu lobortis, eu congue lorem euismod. Nunc aliquam ullamcorper interdum. Fusce diam nibh, accumsan sed sollicitudin a, accumsan sed metus. Donec vestibulum congue lacinia. Mauris odio elit, auctor sed ligula eget, tempor convallis tortor. Nam consectetur ex in elementum auctor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris sodales molestie magna, at vestibulum magna ornare at. Aenean eget ex eros. Pellentesque vel libero id purus semper ullamcorper. Cras eget venenatis est. Quisque venenatis eu est eget mollis. Integer tincidunt at quam eu scelerisque.'
        },
        {
        username: 'test@test.com',
        title: 'Post 3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc hendrerit lectus id arcu lobortis, eu congue lorem euismod. Nunc aliquam ullamcorper interdum. Fusce diam nibh, accumsan sed sollicitudin a, accumsan sed metus. Donec vestibulum congue lacinia. Mauris odio elit, auctor sed ligula eget, tempor convallis tortor. Nam consectetur ex in elementum auctor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris sodales molestie magna, at vestibulum magna ornare at. Aenean eget ex eros. Pellentesque vel libero id purus semper ullamcorper. Cras eget venenatis est. Quisque venenatis eu est eget mollis. Integer tincidunt at quam eu scelerisque.'
        },
        {
        username: 'test@test.com',
        title: 'Post 4',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc hendrerit lectus id arcu lobortis, eu congue lorem euismod. Nunc aliquam ullamcorper interdum. Fusce diam nibh, accumsan sed sollicitudin a, accumsan sed metus. Donec vestibulum congue lacinia. Mauris odio elit, auctor sed ligula eget, tempor convallis tortor. Nam consectetur ex in elementum auctor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris sodales molestie magna, at vestibulum magna ornare at. Aenean eget ex eros. Pellentesque vel libero id purus semper ullamcorper. Cras eget venenatis est. Quisque venenatis eu est eget mollis. Integer tincidunt at quam eu scelerisque.'
        }
    ]
} else {
    throw 'Not implemented yet for non fake persistent data'
}
module.exports = {

    findPostsByUsername(username) {
        return posts.filter(post => post.username === username)
    }
}