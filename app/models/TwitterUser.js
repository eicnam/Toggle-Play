var TwitterUserSchema = new mongoose.Schema({
username: String,
salt:String,
hash:String
)};

var users = mongoose.model('userauths', twitterUserSchema);

