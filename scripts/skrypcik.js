var main = function(){
    //eventListeners for buttons
    $("#fuel_up_but").on('click', function(){fuel_up(ferrari,parseInt($("#fuelNumber").val()));});
    $("#drive_but").on('click', function(){drive(ferrari,parseInt($("#driveNumber").val()));});
    $("#loan_but").on('click', function(){ loan(ferrari,parseInt($("#loanNumber").val()));});
    $(".service_r:last").on('click', function() {race(ferrari);});
    $(".service_r:first").on('click', function() {service_car(ferrari);});
    var ferrari = { //obiect parameters
        money: 10000,
        car_name:"Ferrari",
        production_date: "2015",
        fuel: 50,
        max_fuel: 100,
        mileage: 30000,
        tire_condition: 10,
        overall_condition: 10,
        max_speed: 330*this.overall_condition*this.tire_condition,
        fuel_consumption: 8,
        light_fuel: false,
        light_overall: false,
        races_total:0,
        races_won:0,
    } 

    drive= function(car,kilometers){
        if (kilometers>0){
            if(car.fuel>=car.fuel_consumption*kilometers/100 && car.tire_condition>kilometers/50 &&car.overall_condition>kilometers/50){ //checking car condition and fuel
                car.fuel-=(car.fuel_consumption*kilometers/100);
                car.mileage+=kilometers;
                car.tire_condition-=kilometers/50;
                car.overall_condition-=kilometers/50;
                $("#fuel1").text(Math.round(car.fuel*100)/100);
                $("#mil").text(car.mileage);
                $("#tires").text(Math.round(car.tire_condition*100)/100);
                $("#overall").text(Math.round(car.overall_condition*100)/100);
                if (car.fuel<10) $("#paliwo").attr("src","images/dystrybutor_RED.jpg"); //making fuel-light red if condition is true
                if (car.overall_condition<20) $("#stan_tech").attr("src","images/stan_tech_RED.jpg"); 
                $("#alerts").text('Przejechałeś '+kilometers+' km.');

            }
            else $("#alerts").text('Masz za mało paliwa w baku lub zbyt poturbowany samochód. Dotankuj lub napraw samochód!');
        }
        else $("#alerts").text('Wpisz poprawną (dodatnią) liczbę kilometrów!');
    }

    fuel_up = function(car, liters){
        if (liters>0){
            if (car.fuel+liters <= car.max_fuel && car.money-(liters*5)>=0){ //checking if user have money and a space in a container
                car.fuel+=liters;
                car.money-=liters*5;
                $("#alerts").text('Zatankowałeś '+liters+' litrów. Zapłaciłeś za to '+liters*5+'$.');
                $("#money").text(car.money);
                $("#fuel1").text(Math.round(car.fuel*100)/100); //to avoid 9.5647474 format and make max 2 digits after the dot.
                if (car.fuel>=10) $("#paliwo").attr("src","images/dystrybutor_GREEN.jpg"); //making fuel-light green if condition is true
            }
            else $("#alerts").text("Nie możesz zatankować tej ilości benzyny. Nie masz wystarczająco $$ lub miejsca w baku.");
        }
        else $("#alerts").text('Wpisz poprawną (dodatnią) liczbę litrów do zatankowania!');
    },

    loan = function(car,cash){
        if (cash>0){
            car.money+=cash;
            $("#money").text(car.money);
            $("#alerts").text('Wziąłeś '+cash+'$ pożyczki. Lepiej spłać ją jak najszybciej!');
        }
        else $("#alerts").text('Wpisz poprawną kwotę pożyczki.');
    }

    race = function(car){
        if (car.money<1000) $("#alerts").text('Wpisowe to 1000$. Nie masz tyle ;/')
        else{
            let x=Math.floor(Math.random()*6)+1;
            switch (x){
                case 1: 
                    $("#alerts").text('Wygrałeś wyścig! Zarobiłeś 10,000$!');
                    car.money+=10000;
                    car.races_won+=1;
                    break;
                case 2: 
                    $("#alerts").text('Zająłeś drugie miejsce! Zarobiłeś 5,000$!');
                    car.money+=5000; 
                    break;
                case 3: 
                    $("#alerts").text('Zająłeś trzecie miejsce. Zarobiłeś 2,000$!');
                    car.money+=2000;
                    break;         
                case 4: 
                    $("#alerts").text('Zająłeś czwarte miejsce. Nic nie straciłeś ani nie zarobiłeś');
                    break;
                default:
                    $("#alerts").text('Nie poszło Ci, zająłeś '+x+' miejsce. Straciłeś 1,000$');
                    car.money-=1000; 
            }
            car.races_total+=1;
            $("#money").text(car.money);
            $("#r_total").text(car.races_total);
            $("#r_won").text(car.races_won);
        }
    }

    service_car = function(car){
        if (car.money>=1000){
            car.money-=1000;
            if (car.tire_condition<=80) car.tire_condition+=20;
            else car.tire_condition=100;
            if (car.overall_condition<=80) car.overall_condition+=20;
            else car.overall_condition=100;
            $("#tires").text(Math.round(car.tire_condition*100)/100);
            $("#overall").text(Math.round(car.overall_condition*100)/100);
            $("#money").text(car.money);
            if (car.overall_condition>=20) $("#stan_tech").attr("src","images/stan_tech_GREEN.jpg");
        }
        else $("#alerts").text('Serwis kosztuje 1000$. Nie ma wystarczająco kasy!');
    }
}
$(document).ready(main);