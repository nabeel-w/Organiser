
const addEvent = document.getElementById("add-event-btn");
const eventList= document.getElementById("event-list");
const editBtn=document.getElementById("edit-event-btn");
const alertPlaceholder=document.getElementById("liveAlertPlaceholder");
const viewEvent=document.getElementById("view-detail");
const foot1=document.querySelector(".btn-outline-secondary");
const foot2=document.querySelector(".btn-outline-danger");
const editModal= document.getElementById("")
var suggestions = document.getElementById('location-suggestions');
var esuggestions=document.getElementById('edit-location-suggestions');
var input = document.getElementById('location-input');
var edit=document.getElementById('location-edit');
const search=document.getElementById('search-input');
const searchSuggest=document.getElementById('search-suggestions');
//Local Storage
const storedData= localStorage.getItem('Events');
console.log(JSON.parse(storedData));
let lon;
let lati;
//Display Stored Events
function displayEvents(jsonData){
    console.log("display");
    for(let index=0;index<jsonData.length;index++){
        const name=jsonData[index].name;
        const date=jsonData[index].date;
        let location=jsonData[index].location;
        let commaIndex = location.indexOf(',');
        location=location.slice(0,commaIndex);
        eventList.innerHTML+=`
        <div class="col">
                <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg bg-success">
                    <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                        <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">${name}</h3>
                        <ul class="d-flex list-unstyled mt-auto">
                            <li class="me-auto">
                                <button class="btn btn-primary" id="${jsonData[index].id}" data-bs-toggle="modal" data-bs-target="#view-event"><i class="bi bi-calendar-x me-2"></i>View</button>
                            </li>
                            <li class="d-flex align-items-center me-2">
                                <small>${location}</small>
                            </li>
                            <li class="d-flex align-items-center">
                                <small>${date}</small>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
};

//Add Event
addEvent.addEventListener('click',()=>{
    const name= document.getElementById("name-input").value;
    const date= document.getElementById("date-input").value;
    const time= document.getElementById("time-input").value;
    const location= document.getElementById("location-input").value;
    const note= document.getElementById("note-input").value;
    if(name==""||location==""||date==""||time==""){
        console.log("empty feild")
        const alert=document.createElement('div');
        alert.innerHTML=`<div class="alert alert-warning alert-dismissible" role="alert">
        Fill-Up all feilds!!!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        console.log(alert.innerHTML);
        alertPlaceholder.append(alert)
    }
    else{
        if(!storedData){
            const event=[
                {
                    "id": "",
                    "name": name,
                    "date": date,
                    "time": time,
                    "location":location,
                    "note": note,
                    "latitiude":lati,
                    "long":lon
                }
            ]
            event[0].id=0;
            console.log(event);
            const jsonData= JSON.stringify(event);
            localStorage.setItem('Events',jsonData);
        }
        else{
            const event={
                "id": "",
                "name": name,
                "date": date,
                "time": time,
                "location":location,
                "note": note,
                "latitiude":lati,
                "long":lon
            };
            const parsedData=JSON.parse(storedData);
            let i=parsedData.length;
            event.id=i;
            parsedData.push(event);
            console.log(parsedData);
            const updateData=JSON.stringify(parsedData);
            localStorage.setItem('Events',updateData);
        }
        window.location.href="index.html"
    }
    
});
//Location Auto Complete
input.addEventListener('input',()=>{
    var query = input.value;
    //console.log(query);
    if (query.length > 2) {
      const apiKey="JSIJ0kbeYVYmY-HGKc4w45zKIETsdPWV2CDWDxXN9Bo"
      var url = `https://geocode.search.hereapi.com/v1/geocode?q=${query}&apiKey=${apiKey}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          suggestions.classList.add('show');
          suggestions.innerHTML = '';
          data.items.forEach(item => {
            var li = document.createElement('li');
            li.className="dropdown-item"
            var address = item.address.label;
            lati = item.position.lat;
            lon = item.position.lng;
            li.innerHTML = `${address}`;
            li.addEventListener('click',()=> {
              input.value = address;
              suggestions.classList.remove('show');
              
            });
            suggestions.appendChild(li);
          });
        });
    } else {
      suggestions.innerHTML = '';
    }
  });
  edit.addEventListener('input',()=>{
    var query = edit.value;
    //console.log(query);
    if (query.length > 2) {
      const apiKey="JSIJ0kbeYVYmY-HGKc4w45zKIETsdPWV2CDWDxXN9Bo"
      var url = `https://geocode.search.hereapi.com/v1/geocode?q=${query}&apiKey=${apiKey}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          esuggestions.classList.add('show');
          esuggestions.innerHTML = '';
          data.items.forEach(item => {
            var li = document.createElement('li');
            li.className="dropdown-item"
            var address = item.address.label;
            lati = item.position.lat;
            lon = item.position.lng;
            li.innerHTML = `${address}`;
            li.addEventListener('click',()=> {
              edit.value = address;
              esuggestions.classList.remove('show');
              
            });
            esuggestions.appendChild(li);
          });
        });
    } else {
      esuggestions.innerHTML = '';
    }
  });
//Search Auto Complete
// search.addEventListener('input',()=>{
//     var query=search.value;
//     const parsedData=JSON.parse(storedData);
//     if(query.length>2){
//         for(let index=0;index<parsedData.length;index){
//             if(parsedData[index].name==query||parsedData[index].date==query||parsedData[index].location==query){
//                 searchSuggest.classList.add('show');
//                 searchSuggest.innerHTML='';
//                 var li=document.createElement('li');
//                 li.className="dropdown-item";
//                 var name=parsedData[index].name;
//                 li.innerHTML=`${name}`;
//                 li.addEventListener('click',()=>{
//                     showEvent(parsedData[index].id);
//                 })
//             }
//         }
//     }
// })
//Dynamically Calling Events from storage
if(storedData){
    const parsedData=JSON.parse(storedData);
    displayEvents(parsedData);
}
//View Event Function
function showEvent(id){
    const parsedData=JSON.parse(storedData);
    for(let index=0;index<parsedData.length;index++){
        if(parsedData[index].id==id){
            const name=parsedData[index].name; 
            const date= parsedData[index].date;
            const time= parsedData[index].time;
            const location=parsedData[index].location;
            const note=parsedData[index].note;
            const lat=parsedData[index].latitiude;
            const long=parsedData[index].long;
            viewEvent.innerHTML=`<h1>${name}</h1>
            <p>${note}</p>
            <div class="row">
            <div class="col">Location: ${location}</div>
            <div class="col">Date: ${date}</div>
            <div class="col">Time: ${time}</div>
            </div>
            `;
            foot1.setAttribute('id',id);
            foot2.setAttribute('id',id);
            var map = L.map('map').setView([lat,long], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            var marker = L.marker([lat, long]).addTo(map);
        }
    }
}
//Delete Function
function deleteEvent(id){
    const parsedData=JSON.parse(storedData);
    for(let index=0;index<parsedData.length;index++){
        if(parsedData[index].id==id){
            parsedData.splice(index,1);
            const jsonData=JSON.stringify(parsedData);
            localStorage.setItem('Events',jsonData);
        }
    }
    window.location.href="index.html"
}
//Edit Function
function editEvent(id){
    const parsedData=JSON.parse(storedData);
    for(let index=0;index<parsedData.length;index++){
        if(parsedData[index].id==id){
            console.log(parsedData[index]);
            document.getElementById("name-edit").value= parsedData[index].name;
            document.getElementById("date-edit").value= parsedData[index].date;
            document.getElementById("time-edit").value= parsedData[index].time;
            document.getElementById("location-edit").value= parsedData[index].location;
            document.getElementById("note-edit").value= parsedData[index].note;
            editBtn.addEventListener('click',()=>{
                const name= document.getElementById("name-edit").value;
                const date= document.getElementById("date-edit").value;
                const time= document.getElementById("time-edit").value;
                const location= document.getElementById("location-edit").value;
                const note= document.getElementById("note-edit").value;
                parsedData[index].name=name;
                parsedData[index].date=date;
                parsedData[index].time=time;
                parsedData[index].note=note;
                parsedData[index].location=location;
                parsedData[index].latitiude=lati;
                parsedData[index].long=lon;
                console.log(parsedData[index]);
                const updateData=JSON.stringify(parsedData);
                localStorage.setItem('Events',updateData);
                window.location.href="index.html"
            });
        }
    }
}
//Search Function

//Buttons
const buttons=document.querySelectorAll("button");
//console.log(buttons);
buttons.forEach(button=>{
    button.addEventListener("click" , (e)=>{
        var Id= e.target.id;
        var cass=e.target.classList[1];
        //console.log(cass[1]);
        //console.log(Id);
        switch (cass) {
            case "btn-outline-success":
            case "bi-search":
                //Search
                break;
            case "btn-primary":
                //View Event
                showEvent(Id);
                break;
            case "btn-outline-danger":
                //Delete Event
                console.log("delete");
                deleteEvent(Id);
                break;
            case "btn-outline-secondary":
                //Edit Event
                editEvent(Id);
                console.log("edit");
                break;
            default:
                break;
        }
    })
});