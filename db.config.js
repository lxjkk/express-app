const env = {
    'dev': {user: 'root', password: 'root'},
    'pro': {user: 'lforumbb', password: 'root'}
}
module.exports = {
    host     : 'localhost',
    database : 'lforum',
    multipleStatements: true,
    ...env[process.env.NODE_ENV]
}