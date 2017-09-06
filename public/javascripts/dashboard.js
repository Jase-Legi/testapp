'use strict';

var doc = document,
    win = window,
    new_form = doc.getElementById('new_form'),
    inputcomp = new_form.children,
    selectcomp = newcompany_form.getElementsByTagName('select'),
    textareacomp = newcompany_form.getElementsByTagName('textarea'),
    compDescr = doc.getElementById('compDescr'),
    comp_creat_submit_bttn = doc.getElementById('create_comp_button'),
    compcrturl = 'admin/compcreate/',
    compcreate_wrap = doc.getElementById('compcreate_wrap'),
    invstthispop = doc.getElementById('invstthispop'),
    invstnowwrap = doc.getElementById('invstnowwrap'),
    dwrraap = doc.getElementById('dwrraap'),
    comp_prof_urls = 'admin/getothercomps/',
    compny_create_close_popout = doc.getElementById('compny_create_close_popout'),
    close_investmodal = doc.getElementById("close_investmodal"),
    dashboardboxcont = doc.getElementById('dashboardboxcont'),
    weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    Month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    compny_create_popout = doc.getElementById('compny_create_popout');
    
        
var creatnewcompprofile = function(createurl, callback){
    var errcnt = 0;
    var vals = {};
    for(var i=0;i<inputcomp.length;i++){
        if(inputcomp[i].getAttribute('class') != 'notincluded'){
            if(inputcomp[i].value == '' || inputcomp[i].value == 0) {
                errcnt ++;
                console.log(inputcomp[i].tagName+'++++');
            }
        }
    }
    
    console.log(errcnt);
    if(errcnt == 0){
        for(var i=0;i<inputcomp.length;i++){
            
            if(inputcomp[i].getAttribute('class') != 'notincluded'){
                vals[inputcomp[i].getAttribute('name')] = inputcomp[i].value;
            }
        }
        postthisdata(createurl,callback,vals);
        
    }
};

var dispcompprofiles = function(compprofurls,divele){

    getjsn(compprofurls, (e, findings)=>{
        if(e){
            console.log(e);
        }else{
            if(findings.error){
                console.log(findings.error);
            }else if(findings.content){
                for(var p = 0;p<findings.content.length;p++){
                    
                    //console.log(findings.content[p]);
                    var pooop = parseInt(findings.content[p]._id.toString().substr(0,8), 16)*1000; 
                    var d = doc.createElement('div');
                    d.className = 'featured-investments-iconbox';
                    d.innerHTML = (findings.sessemail == findings.content[p].email)?'':'<div id="invstthispop'+findings.content[p]._id+'" class="pluss" title="Invest in this company!">'
                    +'<img id="invstincmp'+findings.content[p]._id+'" class="svggg" height="100%" src="/images/iibanc resources/icons/invsticon.svg"/></div>';
                    d.innerHTML +='<div class="featured-investments-logo"><img height="100%" src="images/Legiframework.png"/></div><div class="featured-investments-iconinfo"><h4 style="margin:0px;">' + findings.content[p].profile.fundraiser.compname + '</h4><p style="margin:0px;">email: '+ findings.content[p].email + '<br/>bio: '+findings.content[p].profile.fundraiser.description + '</p><p style="font-size:9px;">Created: '+weekday[new Date(pooop).getDay()] +':- '+ Month[new Date(pooop).getMonth()] +', '+ new Date(pooop).getDate()+',  '+ new Date(pooop).getFullYear() +'</p></div>';
                    //console.log(divele)
                    d.setAttribute("data-thisob-id", findings.content[p]._id);
                    divele.appendChild(d);
                    
                }
            }
        }
    });
    
};

var get_dynamic_ele = function(ele,id,classs,thefunc){
    if(id){
        doc.querySelector('body').addEventListener("click", (ev)=>{
            if(ev.target.getAttribute("id") == id){
                thefunc();
            }
        });
    }

    if(classs){
        doc.querySelector('body').addEventListener("click", (ev)=>{
            if(ev.target.getAttribute("class") == classs){
                thefunc();
            }
        });
    }
    
};

(function() {
//doc.addEventListener("DOMContentLoaded",function(event){
    
    dispcompprofiles(comp_prof_urls,dashboardboxcont);
    var invstincmp = doc.getElementById("invstincmp");
    var pluss = doc.getElementsByClassName("pluss");
    
    /*
    doc.querySelector('body').addEventListener("mouseover", function(event) {
        //event.preventDefault();
        
        if (event.target.getAttribute('id') == "invstincmp") {
            event.target.setAttribute("src","/images/iibanc resources/icons/invsticon2.svg");
        }
    });
    
    doc.querySelector('body').addEventListener("mouseout", function(event) {
        //event.preventDefault();
        
        if (event.target.getAttribute('id') == "invstincmp") {
            event.target.setAttribute("src","/images/iibanc resources/icons/invsticon.svg");
        }
    });
    */
    
    dwrraap.addEventListener('click',()=>{
        compcreate_wrap.style.display ='block';
    });
    
    doc.querySelector('body').addEventListener("click", (ev)=>{
        if(ev.target.getAttribute("id") == "invstincmp"+ev.target.parentElement.parentElement.getAttribute("data-thisob-id")){
            console.log(ev.target.getAttribute("id"));
            invstnowwrap.style.display ='block';
        }
    });
    /*invstthispop.addEventListener('click',()=>{
        invstnowwrap.style.display ='block';
    });*/
    
    compny_create_close_popout.addEventListener('click',()=>{
        compcreate_wrap.style.display ='none';
    });
    
    close_investmodal.addEventListener('click',()=>{
        invstnowwrap.style.display ='none';
    });

    compny_create_popout.addEventListener('click',()=>{
        compcreate_wrap.style.display ='none';
    });
    
    comp_creat_submit_bttn.addEventListener('click',()=>{
        
        creatnewcompprofile(compcrturl,(e,info)=>{
            if(e){
                console.log(e+info.msg);
                
            }else{
                console.log(info);
                compcreate_wrap.style.display = 'none';
                
                
                    console.log(info);
                    var pooop = parseInt(info.id.toString().substr(0,8), 16)*1000; 
                    var d = doc.createElement('div');
                    d.className = 'featured-investments-iconbox';
                    d.innerHTML = '<div class="pluss" style="background-color:#FFFFFF;font-weight:bold;position:absolute;margin-top:0px;z-index:2px;font-size:25px;border:1px solid #F2F2F2;height:30px;width:30px;border-radius:15px;text-align:center;" title="Invest in this company!"><a href="/investors" style="text-decoration:none;"><img id="invstincmp" class="svggg" height="100%" src="/images/iibanc resources/icons/invsticon.svg"/></a></div><div class="featured-investments-logo"><img height="100%" src="images/Legiframework.png"/></div><div class="featured-investments-iconinfo"><h4 style="margin:0px;">' + info.comp.profile.fundraiser.compname+ '</h4><p style="margin:0px;">email: ' + info.comp.email+ '<br/>bio:' + info.comp.profile.fundraiser.description + '</p><p style="font-size:9px;">Created: '+ weekday[new Date(pooop).getDay()] +':- '+ Month[new Date(pooop).getMonth()] +', '+ new Date(pooop).getDate()+',  '+ new Date(pooop).getFullYear() +'</p></div>';
                    //console.log(divele)
                    dashboardboxcont.prepend(d);
                
                
                
            }
        });
    });
    
    
})();