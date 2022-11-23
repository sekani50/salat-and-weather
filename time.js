// JavaScript source code
import data from './ng.json' assert { type: 'json' };

/*
let box = document.getElementById("sunrise-box");
box.classList.add("active");
console.log(box.children[0]);
*/
const solatTime = {};


document.getElementById("btn").addEventListener('click', (event) => {

    event.preventDefault();

    let inputVal = document.getElementById("input").value;

    new Promise((resolve, reject) => {

        data.forEach((value) => {
            value.city.toLowerCase() === inputVal.toLowerCase() ? resolve(value.city) : false;

        })
        data.forEach((value) => {
            value.city.toLowerCase() !== inputVal.toLowerCase() ? reject("Shey u dey whyne me ni") : false;

        })

    }).then(res => {
        solatTime.cityName = res;
        fetchData(res);

    }).catch(error => {

        alert(error);
    })

    document.getElementById("input").value = "";

})

const dailyObject = {

    tweak: {}
};

function fetchData(city) {

    let formBox = document.getElementById("first-box");

    formBox.style.height = "0%";
    formBox.style.width = "0%";

    let secondBox = document.getElementById("second-box");


    setTimeout(() => {

        formBox.style.display = "none";
        secondBox.removeAttribute("style", "display:none");

    }, 500);

    fetch("https://api.aladhan.com/v1/timingsByAddress?address=" + city + ",Nigeria&method=99&methodSettings=18.0,null,17.0")

        .then(response => {

            if (!response.ok) {
                console.log('problem');
            }

            return response.json()
        })
        .then(data => {

            const dailyTiming = data.data;

            solatTime.fajr = dailyTiming.timings.Fajr;
            solatTime.sunrise = dailyTiming.timings.Sunrise;
            solatTime.dhuhr = dailyTiming.timings.Dhuhr;
            solatTime.asr = dailyTiming.timings.Asr;
            solatTime.mag = dailyTiming.timings.Maghrib;
            solatTime.isha = dailyTiming.timings.Isha;

            let lat = dailyTiming.meta.latitude;
            let long = dailyTiming.meta.longitude;
        
            const options = {
                        method: 'GET',
                        headers: {
                            'X-RapidAPI-Key': 'f358ba1e39msh66d1a491f35dc02p1265f4jsn9b739af931d2',
                            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                        }
                    };

                    return fetch("https://weatherapi-com.p.rapidapi.com/current.json?q=%3C"+city+"%3E", options)

                        .then(resp => resp.json())
                        .then(response => {
                            solatTime.temp = response.current.temp_c;
                            solatTime.condIcon = response.current.condition.icon;
                            solatTime.condText = response.current.condition.text;


                        })

        })

    console.log(dailyObject);

    setTimeout(displaySolatTime, 3000);


    console.log(solatTime);

}

function displaySolatTime() {

    const dt = new Date();

    let month = dt.toLocaleString("Default", { month: 'long' });

    let day = dt.getDate();
    let year = dt.getFullYear();
    console.log(dt.toLocaleDateString("en-US", { weekday: "long" }));
    
    document.getElementById("date").innerText = day + ", " + month + " " + year;
    document.getElementById("city-name").innerText = solatTime.cityName;
    document.getElementById("weather").innerHTML = solatTime.temp.toPrecision(2) +"&#176;"
    document.getElementById("weath-condn").innerText = solatTime.condText;
    document.getElementById("icon").src = solatTime.condIcon;

  

    if (solatTime.asr.substring(0, 2) > 12) {

        let d = solatTime.asr.substring(0, 2) - 12;
        let asr = "0" + d + ":" + solatTime.asr.substring(3, 5) + " PM";
        document.getElementById("asr").innerHTML = asr;
    }
    if (solatTime.mag.substring(0, 2) > 12) {

        let d = solatTime.mag.substring(0, 2) - 12;
        let mag = "0" + d + ":" + solatTime.mag.substring(3, 5) + " PM";
        document.getElementById("maghrib").innerHTML = mag;


    }
    if (solatTime.isha.substring(0, 2) > 12) {

        let d = solatTime.isha.substring(0, 2) - 12;
        let isha = "0" + d + ":" + solatTime.isha.substring(3, 5) + " PM";
        document.getElementById("isha").innerHTML = isha;


    }

    document.getElementById("fajr").innerHTML = solatTime.fajr + " AM";
    document.getElementById("sunrise").innerHTML = solatTime.sunrise + " AM";
    document.getElementById("dhuhr").innerHTML = solatTime.dhuhr + " PM";

    //console.log(parseFloat(lat).toFixed(3));
    //console.log(parseFloat(long).toFixed(3));

    let dailyFajr = (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear() + " " + solatTime.fajr + ":" + "00";
    let dailySun = (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear() + " " + solatTime.sunrise + ":" + "00";
    let dailyDhuhr = (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear() + " " + solatTime.dhuhr + ":" + "00";
    let dailyAsr = (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear() + " " + solatTime.asr + ":" + "00";
    let dailyMag = (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear() + " " + solatTime.mag + ":" + "00";
    let dailyIsha = (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear() + " " + solatTime.isha + ":" + "00";
    let nextFajr = (dt.getMonth() + 1) + "/" + (dt.getDate() + 1) + "/" + dt.getFullYear() + " " + solatTime.fajr + ":" + "00";
    let nextSun = (dt.getMonth() + 1) + "/" + (dt.getDate() + 1) + "/" + dt.getFullYear() + " " + solatTime.sunrise + ":" + "00";
    let nextDhuhr = (dt.getMonth() + 1) + "/" + (dt.getDate() + 1) + "/" + dt.getFullYear() + " " + solatTime.dhuhr + ":" + "00";
    let nextAsr = (dt.getMonth() + 1) + "/" + (dt.getDate() + 1) + "/" + dt.getFullYear() + " " + solatTime.asr + ":" + "00";
    let nextMag = (dt.getMonth() + 1) + "/" + (dt.getDate() + 1) + "/" + dt.getFullYear() + " " + solatTime.mag + ":" + "00";
    let nextIsha = (dt.getMonth() + 1) + "/" + (dt.getDate() + 1) + "/" + dt.getFullYear() + " " + solatTime.isha + ":" + "00";


    console.log(dailyMag);

    dailyObject.dailyFajr = new Date(dailyFajr).getTime();
    dailyObject.dailySun = new Date(dailySun).getTime();
    dailyObject.dailyDhuhr = new Date(dailyDhuhr).getTime();
    dailyObject.dailyAsr = new Date(dailyAsr).getTime();
    dailyObject.dailyMaghrib = new Date(dailyMag).getTime();
    dailyObject.dailyIsha = new Date(dailyIsha).getTime();


    dailyObject.tweak.nextFajr = new Date(nextFajr).getTime();
    dailyObject.tweak.nextSunrise = new Date(nextSun).getTime();
    dailyObject.tweak.nextDhuhr = new Date(nextDhuhr).getTime();
    dailyObject.tweak.nextAsr = new Date(nextAsr).getTime();
    dailyObject.tweak.nextMaghrib = new Date(nextMag).getTime();
    dailyObject.tweak.nextIsha = new Date(nextIsha).getTime();

    setTimeout(changeActiveDemo, 3000)
}

let i = 0;

function fajr(next, curr) {



    return new Promise((resolve, reject) => {
        i++;
        document.body.style.background = "url('https://imam-us.org/wp-content/uploads/2020/05/The-Difference-Between-Imsak-and-Fajr-WSG-1.jpg')";
        document.getElementById("isha-box").classList.remove("active");                  ///  1
        document.getElementById("fajr-box").classList.add("active");
        setTimeout(() => {
            resolve(1);
        }, next - curr);
    })
}
function sunrise(next, curr) {

    return new Promise((resolve, reject) => {
        i++;
        document.body.style.background = "url('https://images2.alphacoders.com/179/179942.jpg')";
        document.getElementById("fajr-box").classList.remove("active");
        document.getElementById("sunrise-box").classList.add("active");
        setTimeout(() => {
            resolve(2);
        }, next - curr);
    })
}
function dhuhr(next, curr) {

    return new Promise((resolve, reject) => {
        i++;
        document.body.style.background = "url('https://muslimhands.org.uk/_ui/images/f6d02d89901e.jpg')";
        document.getElementById("dhuhr-box").classList.add("active");
        document.getElementById("sunrise-box").classList.remove("active");
        setTimeout(() => {
            resolve(3);
        }, next - curr);
    })
}
function asr(next, curr) {


    return new Promise((resolve, reject) => {
        i++;
        document.body.style.background = "url('https://assets.wam.ae/uploads/2020/01/156267530783197414.jpg')";
        document.getElementById("dhuhr-box").classList.remove("active");
        document.getElementById("asr-box").classList.add("active");
        setTimeout(() => {
            resolve(4);
        }, next - curr);
    })
}
function maghrib(next, curr) {


    return new Promise((resolve, reject) => {
        i++;
        document.body.style.background = "url('https://rnz-ressh.cloudinary.com/image/upload/s--4mhu29yP--/c_scale,f_auto,q_auto,w_1050/4NEWL9J_image_crop_76972')";
        document.getElementById("asr-box").classList.remove("active");
        document.getElementById("maghrib-box").classList.add("active");
        setTimeout(() => {
            resolve(5);
        }, next - curr);
    })
}
function isha(next, curr) {


    return new Promise((resolve, reject) => {
        i++;
        document.body.style.background = "url('https://i0.wp.com/www.prayerinislam.com/wp-content/uploads/2014/05/shutterstock_131816702.jpg')";
        document.getElementById("maghrib-box").classList.remove("active");
        document.getElementById("isha-box").classList.add("active");
        setTimeout(() => {
            resolve(6);
        }, next - curr);
    })
}

let currentTime = new Date().getTime();
console.log(currentTime);



function changeActiveDemo(i) {



    if (currentTime >= dailyObject.dailyFajr && currentTime < dailyObject.dailySun) {
        let curSave = currentTime;
        new Promise((resolve, reject) => {

            i++;
            document.body.style.background = "url('https://imam-us.org/wp-content/uploads/2020/05/The-Difference-Between-Imsak-and-Fajr-WSG-1.jpg')";
            document.getElementById("isha-box").classList.remove("active");             ///  1
            document.getElementById("fajr-box").classList.add("active");
            setTimeout(() => {
                resolve(1);
            }, dailyObject.dailySun - curSave);
        }).then((result) => {

            console.log(result);
            return sunrise(dailyObject.dailyDhuhr, dailyObject.dailySun);

        }).then((result) => {

            console.log(result);
            return dhuhr(dailyObject.dailyAsr, dailyObject.dailyDhuhr);

        }).then((result) => {

            console.log(result);
            return asr(dailyObject.dailyMaghrib, dailyObject.dailyAsr);

        }).then((result) => {

            console.log(result);
            return maghrib(dailyObject.dailyIsha, dailyObject.dailyMaghrib);

        }).then((result) => {

            console.log(result);
            return isha(dailyObject.tweak.nextFajr, dailyObject.dailyIsha);

        }).then((result) => {
            console.log(result);
            i = 0;
            changeActiveDemo(i);
        })

    } else if (currentTime >= dailyObject.dailySun && currentTime < dailyObject.dailyDhuhr) {
        let curSave = currentTime;
        new Promise((resolve, reject) => {
            i++;
            document.body.style.background = "url('https://images2.alphacoders.com/179/179942.jpg')";
            document.getElementById("fajr-box").classList.remove("active");
            document.getElementById("sunrise-box").classList.add("active");
            setTimeout(() => {
                resolve(2);
            }, dailyObject.dailyDhuhr - curSave);

            //dhuhr    //asr   //mag    //isha //fajr
        }).then((result) => {

            console.log(result);
            return dhuhr(dailyObject.dailyAsr, dailyObject.dailyDhuhr);

        }).then((result) => {

            console.log(result);
            return asr(dailyObject.dailyMaghrib, dailyObject.dailyAsr);

        }).then((result) => {

            console.log(result);
            return maghrib(dailyObject.dailyIsha, dailyObject.dailyMaghrib);

        }).then((result) => {

            console.log(result);
            return isha(dailyObject.tweak.nextFajr, dailyObject.dailyIsha);

        }).then((result) => {
            console.log(result);

            return fajr(dailyObject.tweak.nextSunrise, dailyObject.tweak.nextFajr);
        }).then((result) => {
            console.log(result);
            i = 0;
            changeActiveDemo(i);
        });


    } else if (currentTime >= dailyObject.dailyDhuhr && currentTime < dailyObject.dailyAsr) {
        let curSave = currentTime;
        new Promise((resolve, reject) => {
            i++;
            document.getElementById("fajr-box").classList.remove("active");
            document.body.style.background = "url('https://muslimhands.org.uk/_ui/images/f6d02d89901e.jpg')";
            document.getElementById("dhuhr-box").classList.add("active");
            document.getElementById("sunrise-box").classList.remove("active");
            setTimeout(() => {
                resolve(3);
            }, dailyObject.dailyAsr - curSave);
        }).then((result) => {

            console.log(result);
            return asr(dailyObject.dailyMaghrib, dailyObject.dailyAsr);

        }).then((result) => {

            console.log(result);
            return maghrib(dailyObject.dailyIsha, dailyObject.dailyMaghrib);

        }).then((result) => {

            console.log(result);
            return isha(dailyObject.tweak.nextFajr, dailyObject.dailyIsha);

        }).then((result) => {
            console.log(result);

            return fajr(dailyObject.tweak.nextSunrise, dailyObject.tweak.nextFajr);
        }).then((result) => {
            console.log(result);

            return sunrise(dailyObject.tweak.nextDhuhr, dailyObject.tweak.nextSunrise);
        }).then((result) => {
            console.log(result);
            i = 0;
            changeActiveDemo(i);
        });


    } else if (currentTime >= dailyObject.dailyAsr && currentTime < dailyObject.dailyMaghrib) {
        let curSave = currentTime;
        new Promise((resolve, reject) => {

            i++;
            document.getElementById("fajr-box").classList.remove("active");
            document.body.style.background = "url('https://assets.wam.ae/uploads/2020/01/156267530783197414.jpg')";
            document.getElementById("dhuhr-box").classList.remove("active");
            document.getElementById("asr-box").classList.add("active");
            setTimeout(() => {
                resolve(4);
            }, dailyObject.dailyMaghrib - curSave);
        }).then((result) => {

            console.log(result);
            return maghrib(dailyObject.dailyIsha, dailyObject.dailyMaghrib);

        }).then((result) => {

            console.log(result);
            return isha(dailyObject.tweak.nextFajr, dailyObject.dailyIsha);

        }).then((result) => {
            console.log(result);

            return fajr(dailyObject.tweak.nextSunrise, dailyObject.tweak.nextFajr);
        }).then((result) => {
            console.log(result);

            return sunrise(dailyObject.tweak.nextDhuhr, dailyObject.tweak.nextSunrise);
        }).then((result) => {
            console.log(result);

            return dhuhr(dailyObject.tweak.nextAsr, dailyObject.tweak.nextDhuhr);
        }).then((result) => {
            console.log(result);
            i = 0;
            changeActiveDemo(i);
        });

    } else if (currentTime >= dailyObject.dailyMaghrib && currentTime < dailyObject.dailyIsha) {
        let curSave = currentTime;
        new Promise((resolve, reject) => {
            i++;
            document.getElementById("fajr-box").classList.remove("active");
            document.body.style.background = "url('https://rnz-ressh.cloudinary.com/image/upload/s--4mhu29yP--/c_scale,f_auto,q_auto,w_1050/4NEWL9J_image_crop_76972')";
            document.getElementById("asr-box").classList.remove("active");
            document.getElementById("maghrib-box").classList.add("active");
            setTimeout(() => {
                resolve(5);
            }, dailyObject.dailyIsha - curSave);

        }).then((result) => {

            console.log(result);
            return isha(dailyObject.tweak.nextFajr, dailyObject.dailyIsha);

        }).then((result) => {
            console.log(result);

            return fajr(dailyObject.tweak.nextSunrise, dailyObject.tweak.nextFajr);
        }).then((result) => {
            console.log(result);

            return sunrise(dailyObject.tweak.nextDhuhr, dailyObject.tweak.nextSunrise);
        }).then((result) => {
            console.log(result);

            return dhuhr(dailyObject.tweak.nextAsr, dailyObject.tweak.nextDhuhr);
        }).then((result) => {
            console.log(result);

            return asr(dailyObject.tweak.nextMaghrib, dailyObject.tweak.nextAsr);
        }).then((result) => {
            console.log(result);
            console.log(result);
            i = 0;
            changeActiveDemo(i);

        });
    } else if (currentTime < dailyObject.dailyFajr) {
        let curSave = currentTime;
        new Promise((resolve, reject) => {
            i++;
            document.getElementById("fajr-box").classList.remove("active");
            //document.body.style.background = "url('https://i0.wp.com/www.prayerinislam.com/wp-content/uploads/2014/05/shutterstock_131816702.jpg')";
            document.getElementById("maghrib-box").classList.remove("active");
            document.getElementById("isha-box").classList.add("active");
            setTimeout(() => {
                resolve(6);
            }, dailyObject.dailyFajr - curSave);

        }).then((result) => {
            console.log(result);

            return fajr(dailyObject.dailySunrise, dailyObject.dailyFajr);
        }).then((result) => {
            console.log(result);

            return sunrise(dailyObject.dailyDhuhr, dailyObject.dailySunrise);
        }).then((result) => {
            console.log(result);

            return dhuhr(dailyObject.dailyAsr, dailyObject.dailyDhuhr);
        }).then((result) => {
            console.log(result);

            return asr(dailyObject.dailyMaghrib, dailyObject.dailyAsr);
        }).then((result) => {
            console.log(result);

            return maghrib(dailyObject.dailyIsha, dailyObject.dailyMaghrib);

        }).then((result) => {
            console.log(result);
            console.log(result);
            i = 0;
            changeActiveDemo(i);

        });
    } else if (currentTime >= dailyObject.dailyIsha && currentTime < dailyObject.tweak.nextFajr) {
        let curSave = currentTime;
        new Promise((resolve, reject) => {
            i++;
            //document.body.style.background = "url('https://i0.wp.com/www.prayerinislam.com/wp-content/uploads/2014/05/shutterstock_131816702.jpg')";

            document.getElementById("fajr-box").classList.remove("active");

            document.getElementById("maghrib-box").classList.remove("active");
            document.getElementById("isha-box").classList.add("active");
            setTimeout(() => {
                resolve(6);
            }, dailyObject.tweak.nextFajr - curSave);

        }).then((result) => {
            console.log(result);

            return fajr(dailyObject.tweak.nextSunrise, dailyObject.tweak.nextFajr);
        }).then((result) => {
            console.log(result);

            return sunrise(dailyObject.tweak.nextDhuhr, dailyObject.tweak.nextSunrise);
        }).then((result) => {
            console.log(result);

            return dhuhr(dailyObject.tweak.nextAsr, dailyObject.tweak.nextDhuhr);
        }).then((result) => {
            console.log(result);

            return asr(dailyObject.tweak.nextMaghrib, dailyObject.tweak.nextAsr);
        }).then((result) => {
            console.log(result);

            return maghrib(dailyObject.tweak.nextIsha, dailyObject.tweak.nextMaghrib);

        }).then((result) => {
            console.log(result);
            console.log(result);
            i = 0;
            changeActiveDemo(i);

        });
    } else {
        console.log("Time has stopped");
        i = 0;
        changeActiveDemo(i);
    }

}


function displayTime() {

    let date = new Date();

    let hour = date.getHours();

    let minutes = date.getMinutes();

    let seconds = date.getSeconds();

    let amPm;

    if (hour < 12) {

        amPm = "AM";
    }
    if (hour == 12) {

        amPm = "PM";

    } if (hour == 0) {

        amPm = "AM";

        hour = 12;

    }
    if (hour > 12) {

        amPm = "PM";

        hour = hour - 12;
    }

    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minutes < 10) {

        minutes = "0" + minutes;
    }
    if (seconds < 10) {

        seconds = "0" + seconds;
    }

    document.getElementById("hrs").innerHTML = hour;
    document.getElementById("min").innerHTML = minutes;
    document.getElementById("sec").innerHTML = seconds;
    document.getElementById("ampm").innerHTML = amPm;

}

setInterval(displayTime, 1000);



function toggleDisplay() {
    let secondBox = document.getElementById("second-box");

    secondBox.style.width = "0%";
    secondBox.style.height = "0%";

    let formBox = document.getElementById("first-box");


    setTimeout(() => {

        secondBox.setAttribute("style", "display:none");
        formBox.removeAttribute("style", "display:none");

    }, 300);
};

document.getElementById("back-one").addEventListener('click', toggleDisplay);
document.getElementById("back-two").addEventListener('click', toggleDisplay);
