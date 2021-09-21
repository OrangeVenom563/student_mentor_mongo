invalidUrl404 = (req,res)=>{
    res.status(404).send('You have entered an invalid url')
}

module.exports = invalidUrl404