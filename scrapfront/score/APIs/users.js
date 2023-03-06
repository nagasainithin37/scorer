const exp=require('express')
const userApp=exp.Router()
const expressAsyncHandler=require('express-async-handler')
const axios=require('axios')
userApp.use(exp.json())


//create user
userApp.post('/createDetails',expressAsyncHandler(async(req,res)=>{
    let userObj=req.app.get('userProfileCollectionObj')
    let userDetails=req.body
    let data={}
    var score=0;
data['username']=userDetails.username

    //leetcode
    if(userDetails.lc_username==''){
        data['lc']={
            "username": "",
            "rating": '',
            "noOfProblemsSolved": "",
            "noOfEasyProblems": "",
            "noOfMediumProblems": "",
            "noOfHardProblems": "",
            "badges": "",
            "rank": ""
    }
    }
    else{
        const lc_profile=await axios.get('http://localhost:3000/details/lc/'+userDetails.lc_username)
        data['lc']=lc_profile.data.payload
        score+=(parseInt(lc_profile.data.payload.noOfProblemsSolved)*50)
        console.log(lc_profile.data.payload)
            var rat=''
            var rats=lc_profile.data.payload.rating
            for(var i=0;i<rats.length;i++){
                if (rats[i]>='0' && rats[i]<='9'){
                    rat+=rats[i]
                }
            }
            if(parseInt(lc_profile.data.payload.noOfContests)>3 && parseInt(rat)>1300){
            score+=parseInt(Math.pow(parseInt(rat)-1300,2)/30)
        }
            console.log('Leetocoide score '+score)
            
        data={...data,"lcScore":score}
       
    }

    //code chef
    if(userDetails.cc_username==''){
        data['cc']={
            "rating": "",
            "name": "",
            "GlobalRank": "",
            "CountryRank": "",
            "noOfProblemsSolved": "",
            "noOfContests": ""
        }
    }
    else{
        const cc_profile=await axios.get('http://localhost:3000/details/cc/'+userDetails.cc_username)
        data['cc']=cc_profile.data.payload
        var ccscore=parseInt(cc_profile.data.payload.noOfProblemsSolved)*10
        var ccContest=cc_profile.data.payload.noOfContests
        if(ccContest>=3 && (parseInt(cc_profile.data.payload.rating)>1300)){
            ccscore+=parseInt(Math.pow(parseInt(cc_profile.data.payload.rating)-1300,2)/30)
        }
        score+=ccscore
        data={...data,"ccScore":ccscore}
        
    }

    //codeforces
    if(userDetails.cf_username==''){
        data['cf']={
            "username": "",
            "rating": "",
            "noOfProblemsSolved": "",
            "noOfContests": ''
        }
    }
    else{
        const cf_profile=await axios.get('http://localhost:3000/details/cf/'+userDetails.cf_username)
        data['cf']=cf_profile.data.payload
        var cfScore=parseInt(cf_profile.data.payload.noOfProblemsSolved)*10
        if (cf_profile.data.payload.noOfContests>=3 && parseInt(cf_profile.data.payload.rating)>3){
             cfScore+=parseInt(Math.pow(parseInt(cf_profile.data.payload.rating)-1200,2)/30)
        }
        score+=cfScore
        data={...data,"cfScore":cfScore}
    }

    //spoj
    if(userDetails.spoj_username==''){
        data['spoj']={
            "username": "",
        }
    }
    else{
        const spoj_profile=await axios.get('http://localhost:3000/details/spoj/'+userDetails.spoj_username)
        data['spoj']=spoj_profile.data.payload
        var x=spoj_profile.data.payload.noOfProblemsSolved*20
        data={...data,"spojScore":x}
        score+=x

    }
    data={...data,"score":score}

    //Create User
    var userProfileCollectionObj=req.app.get('userProfileCollectionObj')
    await userProfileCollectionObj.insertOne(data)
    res.send({"message":"data inserted successfully",payload:data})
}))

//Fetch user profile details
userApp.get('/getdetails/:username',expressAsyncHandler(async(req,res)=>{
    let username=req.params.username
    let userProfileCollectionObj=req.app.get('userProfileCollectionObj')
    let result=await userProfileCollectionObj.findOne({username:username})
    res.send({message:"User details are",payload:result})
}))

//update details
userApp.put('/updatedetails',expressAsyncHandler(async(req,res)=>{
    let userProfileCollectionObj=req.app.get('userProfileCollectionObj')
    let newUserObj=req.body
    await userProfileCollectionObj.updateOne({username:newUserObj.username},{$set:{...newUserObj}})
    res.send({message:'UserUpdated Successfully'})
}))

//Update each details
userApp.get('/updateProfiles',expressAsyncHandler(async(req,res)=>{
    let userProfileCollectionObj=req.app.get('userProfileCollectionObj')
    let result=await userProfileCollectionObj.find({}).toArray()
    // console.log(result)
    for(var j=0;j<result.length;j++){
       
        var a={}
        a['username']=result[j].username
        a['lc_username']=result[j]['lc'].username
        a['cc_username']=result[j]['cc']['username']
         a['cf_username']=result[j]['cf']['username']
        a['spoj_username']=result[j]['spoj']['username']
        var updatedProfile={}
        updatedProfile['username']=a['username']
        var tempp=(await axios.get('http://localhost:3000/details/lc/'+a['lc_username'])).data
        updatedProfile['lc']=tempp.payload
        tempp=(await axios.get('http://localhost:3000/details/cc/'+a['cc_username'])).data
        updatedProfile['cc']=tempp.payload
        tempp=(await axios.get('http://localhost:3000/details/cf/'+a['cf_username'])).data
        updatedProfile['cf']=tempp.payload
        tempp=(await axios.get('http://localhost:3000/details/spoj/'+a['spoj_username'])).data
        updatedProfile['spoj']=tempp.payload
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // LEET code Score Updation
        var lcs=0
        var rat=''
            var rats=updatedProfile.lc.rating
           
            for(var i=0;i<rats.length;i++){
                if (rats[i]>='0' && rats[i]<='9'){
                    rat+=rats[i]
                }
            }
            if(parseInt(updatedProfile.lc.noOfContests)>3 && parseInt(rat)>1300){
            lcs+=parseInt(Math.pow(parseInt(rat)-1300,2)/30)
        }
        lcs+=parseInt(updatedProfile.lc.noOfProblemsSolved)*50
        updatedProfile['lcScore']=lcs
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//***************************************************************************************************************************************************** */
        //CodeChef Score Updation
        var ccs=0
        ccs=parseInt(updatedProfile['cc']['noOfProblemsSolved'])*10
        var ccrat=parseInt(updatedProfile['cc']['rating'])
        if(parseInt(updatedProfile['cc']['noOfContests'])>3 && ccrat>1300)
        {
            ccs+=parseInt(Math.pow(ccrat-1300,2)/30)
        }
        updatedProfile['ccScore']=ccs
//******************************************************************************************************************************************************************** */
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var cfs=parseInt(updatedProfile['cf']['noOfProblemsSolved'])*10
        var cfrat=parseInt(updatedProfile['cf']['rating'])
        if(cfrat>1200 && updatedProfile['cf']['noOfContests']>3){
            cfs+=parseInt(Math.pow(cfrat-1200,2)/30)
        }
        updatedProfile['cfScore']=cfs
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//************************************************************************************************************************************* */

        updatedProfile['spojScore']=updatedProfile['spoj']['noOfProblemsSolved']*20

        updatedProfile['score']=lcs+ccs+cfs+updatedProfile['spojScore']

 await axios.put('http://localhost:3000/profile/updatedetails',updatedProfile)
    }

    
    res.send({message:'updatedProfile'})
}))


//get All profiles
userApp.get('/getProfiles',expressAsyncHandler(async(req,res)=>{
    let userProfileCollectionObj=req.app.get('userProfileCollectionObj')
    let result=await userProfileCollectionObj.find({}).sort({score:-1}).toArray()

    res.send({payload:result})
}))


//update specific user profiles
userApp.put('/updateUserProfile',expressAsyncHandler(async(req,res)=>{
    let userDetails=req.body
    let data={}
    var score=0;
data['username']=userDetails.username

    //leetcode
    if(userDetails.lc_username==''){
        data['lc']={
            "username": "",
            "rating": '',
            "noOfProblemsSolved": "",
            "noOfEasyProblems": "",
            "noOfMediumProblems": "",
            "noOfHardProblems": "",
            "badges": "",
            "rank": ""
    }
    }
    else{
        const lc_profile=await axios.get('http://localhost:3000/details/lc/'+userDetails.lc_username)
        data['lc']=lc_profile.data.payload
        score+=(parseInt(lc_profile.data.payload.noOfProblemsSolved)*50)
        console.log(lc_profile.data.payload)
            var rat=''
            var rats=lc_profile.data.payload.rating
            for(var i=0;i<rats.length;i++){
                if (rats[i]>='0' && rats[i]<='9'){
                    rat+=rats[i]
                }
            }
            if(parseInt(lc_profile.data.payload.noOfContests)>3 && parseInt(rat)>1300){
            score+=parseInt(Math.pow(parseInt(rat)-1300,2)/30)
        }
            console.log('Leetocoide score '+score)
            
        data={...data,"lcScore":score}
       
    }

    //code chef
    if(userDetails.cc_username==''){
        data['cc']={
            "rating": "",
            "name": "",
            "GlobalRank": "",
            "CountryRank": "",
            "noOfProblemsSolved": "",
            "noOfContests": ""
        }
    }
    else{
        const cc_profile=await axios.get('http://localhost:3000/details/cc/'+userDetails.cc_username)
        data['cc']=cc_profile.data.payload
        var ccscore=parseInt(cc_profile.data.payload.noOfProblemsSolved)*10
        var ccContest=cc_profile.data.payload.noOfContests
        if(ccContest>=3 && (parseInt(cc_profile.data.payload.rating)>1300)){
            ccscore+=parseInt(Math.pow(parseInt(cc_profile.data.payload.rating)-1300,2)/30)
        }
        score+=ccscore
        data={...data,"ccScore":ccscore}
        
    }

    //codeforces
    if(userDetails.cf_username==''){
        data['cf']={
            "username": "",
            "rating": "",
            "noOfProblemsSolved": "",
            "noOfContests": ''
        }
    }
    else{
        const cf_profile=await axios.get('http://localhost:3000/details/cf/'+userDetails.cf_username)
        data['cf']=cf_profile.data.payload
        var cfScore=parseInt(cf_profile.data.payload.noOfProblemsSolved)*10
        if (cf_profile.data.payload.noOfContests>=3 && parseInt(cf_profile.data.payload.rating)>1200){
             cfScore+=parseInt(Math.pow(parseInt(cf_profile.data.payload.rating)-1200,2)/30)
        }
        score+=cfScore
        data={...data,"cfScore":cfScore}
    }

    //spoj
    if(userDetails.spoj_username==''){
        data['spoj']={
            "username": "",
        }
    }
    else{
        const spoj_profile=await axios.get('http://localhost:3000/details/spoj/'+userDetails.spoj_username)
        data['spoj']=spoj_profile.data.payload
        var x=spoj_profile.data.payload.noOfProblemsSolved*20
        data={...data,"spojScore":x}
        score+=x

    }
    data={...data,"score":score}
    //Create Userprofilecollection obj
    var userProfileCollectionObj=req.app.get('userProfileCollectionObj')

    await userProfileCollectionObj.updateOne({username:data.username},{$set:{...data}})
res.send({message:'data updated successfully'})
}))

module.exports=userApp