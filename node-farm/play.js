var myName = 'Max';
var myAge = 28
var hasHobbies = true;
function summerizeUser(userName, userAge, userHasHobby){
    return(
        'Name is ' +
        userName +
        ', age is ' + 
        userAge +
        ' and the user has hobbies: ' +
        userHasHobby
    );
}
console.log(summerizeUser(myName, myAge, hasHobbies));

// ARROW FUNCTION
const add = (a, b) => {
    return a + b;
}
console.log(add(5, 5));

//key value pair
const person = {
    name: 'max',
    age: 30,
    greet() {
        console.log('Hi, I am ' + this.name)
    }
}
person.greet()

//ARRYS
const hobbies = ['Sports', 'Cooking', 'traveling']; 
for(let hobby of hobbies){
    console.log(hobby);
}
hobbies.map(hobby => {
    return 'Hobby: ' + hobby
})
//OR USING MAP
let hub = hobbies.map(hobby => 'Hobby: ' + hobby)
console.log(hub);

//REFERENCE TYPES
hobbies.push('programming')
console.log(hobbies)

//spread and rest operator
console.log(...hobbies)
const toArray = (...args) => {
    return args;
}
console.log(toArray(1,2,3,4,5))
//Destructuring
const { name, age } = person
console.log(name, age) 
const [hobby1, hobby2, hobby3] = hobbies
console.log(hobby1, hobby2, hobby3);
//Async code
 