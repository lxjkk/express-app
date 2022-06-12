const env = {
    'dev': {database : 'lforum',user: 'root', password: 'root'},
    'pro': {database : 'lforumbb', user: 'lforumbb', password: 'root'}
}
console.log(process.env.NODE_ENV, env);
module.exports = {
    host     : 'localhost',
    multipleStatements: true,
    ...env[process.env.NODE_ENV]
}