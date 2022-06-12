const env = {
    'dev': {database : 'lforum',user: 'root', password: 'root'},
    'pro': {database : 'lforumbb', user: 'lforumbb', password: 'root'}
}
module.exports = {
    host     : 'localhost',
    multipleStatements: true,
    ...env[process.env.NODE_ENV]
}