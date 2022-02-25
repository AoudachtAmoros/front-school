<template>
    <div class="px-1 xs:px-2  md:px-4 xl:px-6 overflow-x-hidden" style="height: calc(100vh - 80px);">
        <div class="w-full h-full flex gap-3 bg-gray-300 px-4 py-6">
            <div v-if="state==0" class="h-full w-full flex items-center justify-center">
                <div class="flex flex-col items-center">
                    <span class="neoning bg-red-300 mx-4 "></span>
                <h1 class="text-center font-bold w-full text-3xl py-3 px-2 ">Waiting for your father</h1>
                </div>
            </div>
            <div v-if="state==1 && users.length>0" class="xs:px-2 sm:px-8 md:px-8 h-full w-full justify-around flex gap-2">
                <div class="relative w-2/3 h-full flex flex-col items-center justify-center">
                    <span class="absolute top-4 left-4 z-10 neoning bg-green-300 mx-4"></span>
                    <div class="absolute top-0 left-2 right-2 bottom-0 slider-container">
                        <div v-for="(user, index) in users" :key="index" v-show="currentIndex==index" class="w-full h-full">
                                <div class="absolute bottom-2 right-2 left-2 text-center z-10 opacity-70 p-2 bg-gray-200">
                                   <span class="text-2xl z-10 text-gray-700 opacity-100 z-20 text-2xl">{{user.s_first_name}} {{user.s_last_name}}</span>
                                </div>
                                <ImageC :data="user.img" /> 
                        </div>
                            <!-- <button @click="add" class="py-2 px-4 bg-primary text-white opacity-80 hover:opacity-100 rounded shadow "> Add</button> -->
                            <!-- <button @click="del" class="py-2 px-4 bg-primary text-white opacity-80 hover:opacity-100 rounded shadow "> Delete</button> -->
                    </div>
                </div>
                <div class="w-1/3 oervlow-x-hidden overflow-y-auto bg-gray-400 p-2">
                    <div class="flex items-center bg-gray-300 m-1 p-2 rounded">
                        <span>
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                    width="32px" height="32px" viewBox="0 0 64.000000 64.000000"
                                    preserveAspectRatio="xMidYMid meet">

                                    <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                                    fill="#000000" stroke="none">
                                    <path d="M235 610 c-3 -5 -32 -10 -64 -10 -31 0 -62 -5 -69 -12 -17 -17 -17
                                    -539 0 -556 17 -17 419 -17 436 0 17 17 17 539 0 556 -7 7 -38 12 -69 12 -32
                                    0 -61 5 -64 10 -3 6 -42 10 -85 10 -43 0 -82 -4 -85 -10z m155 -40 l0 -30 -70
                                    0 -70 0 0 30 0 30 70 0 70 0 0 -30z m-160 -10 c0 -17 -7 -20 -40 -20 l-40 0 0
                                    -230 0 -230 170 0 170 0 0 230 0 230 -40 0 c-33 0 -40 3 -40 20 0 18 7 20 60
                                    20 l60 0 0 -270 0 -270 -210 0 -210 0 0 270 0 270 60 0 c53 0 60 -2 60 -20z
                                    m245 -250 l0 -215 -155 0 -155 0 -3 205 c-1 112 0 210 3 217 3 11 39 13 157
                                    11 l153 -3 0 -215z"/>
                                    <path d="M275 570 c3 -5 24 -10 45 -10 21 0 42 5 45 10 4 6 -13 10 -45 10 -32
                                    0 -49 -4 -45 -10z"/>
                                    <path d="M255 470 c-14 -15 -21 -17 -32 -9 -20 18 -29 1 -10 -18 16 -16 19
                                    -16 44 9 15 15 25 30 22 33 -3 3 -14 -4 -24 -15z"/>
                                    <path d="M320 480 c0 -6 27 -10 60 -10 33 0 60 4 60 10 0 6 -27 10 -60 10 -33
                                    0 -60 -4 -60 -10z"/>
                                    <path d="M320 440 c0 -5 14 -10 30 -10 17 0 30 5 30 10 0 6 -13 10 -30 10 -16
                                    0 -30 -4 -30 -10z"/>
                                    <path d="M255 370 c-14 -15 -21 -17 -32 -9 -20 18 -29 1 -10 -18 16 -16 19
                                    -16 44 9 15 15 25 30 22 33 -3 3 -14 -4 -24 -15z"/>
                                    <path d="M320 380 c0 -5 24 -10 54 -10 30 0 58 5 61 10 4 6 -17 10 -54 10 -34
                                    0 -61 -4 -61 -10z"/>
                                    <path d="M320 340 c0 -5 14 -10 30 -10 17 0 30 5 30 10 0 6 -13 10 -30 10 -16
                                    0 -30 -4 -30 -10z"/>
                                    <path d="M260 275 c-9 -11 -22 -14 -39 -10 -25 6 -25 6 -6 -15 l19 -21 25 25
                                    c14 14 22 28 19 31 -3 3 -11 -2 -18 -10z"/>
                                    <path d="M320 280 c0 -5 24 -10 54 -10 30 0 58 5 61 10 4 6 -17 10 -54 10 -34
                                    0 -61 -4 -61 -10z"/>
                                    <path d="M320 240 c0 -5 14 -10 30 -10 17 0 30 5 30 10 0 6 -13 10 -30 10 -16
                                    0 -30 -4 -30 -10z"/>
                                    <path d="M250 175 c-8 -10 -21 -13 -34 -9 -21 7 -21 6 -2 -15 l19 -21 24 22
                                    c13 12 23 25 23 30 0 13 -17 9 -30 -7z"/>
                                    <path d="M348 183 c17 -2 47 -2 65 0 17 2 3 4 -33 4 -36 0 -50 -2 -32 -4z"/>
                                    <path d="M320 140 c0 -5 14 -10 30 -10 17 0 30 5 30 10 0 6 -13 10 -30 10 -16
                                    0 -30 -4 -30 -10z"/>
                                    </g>
                        </svg>
                        </span>
                       <h1 class="ml-2 text-xl">Waiting List</h1><br>
                    </div>
                    <div class=" grid grid-cols-2 gap-2 overflow-y-auto">
                        <div class="w-full flex flex-col hover:border-2 border-red-300 items-center p-2 m-1 bg-gray-500 rounded" v-for="(user, index) in users" :key="index">
                                <div class="py-2">
                                        <h4 class="text-xl text-white">{{user.s_first_name}} {{user.s_last_name}}</h4>
                                    </div>
                                <div class="img-continer w-full rounded">
                                    <ImageC :data="user.img" class="rounded" />  
                                </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ImageC from '../../components/ImageC.vue'
import SocketioService from '../../services/sockets.io';

export default {
  props: {
  },
    components:{
        ImageC
    },
  data () {
    return {
        state : 1,
        currentIndex:0,
        paylod:{
            parentImage:'',
            studentImage:'',
            parentNane:'',
            studentName:'',
        },
        users :[
            {
<<<<<<< HEAD
              first_name :'user 1',
              last_name :'ls',
              s_first_name :'student',
              s_last_name :'ls',
              img :  {
                        src:'data:image/jpeg;base64,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',
                        alt:'',
                    },
            },
            {
              first_name :'user 2',
              last_name :'opp',
              s_first_name :'student',
              s_last_name :'opp',
               img :  {
                    src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuB4NNDud9NhGDNksKtH-gX4mNtXm6D51EcRJBqk9lU89Hc0ycbRurFvgsziP89cwbuaA&usqp=CAU',
                    alt:'',
<<<<<<< HEAD
        setInterval(() => {
            this.moveSlider()
=======
     
        setInterval(() => {
            this.moveSlider()
        }, 4000);
>>>>>>> 0d859ce4d3f52803f937d6a16c0a067064b6df0d
    },
    methods:{
        moveSlider(){
            if (this.users.length>0) {
                if (this.currentIndex < this.users.length ) {
                    this.currentIndex +=1
                }
                if (this.currentIndex == this.users.length) {
                    this.currentIndex = 0
                }
            }
        },
        add(data){
            console.log(data);
            // this.users.push(this.user)
        },
<<<<<<< HEAD
        newstudent(data){
            this.state = 1
            this.users.push(data.data) 
        },
        moveSlider(){
            if (this.users.length>0) {
                if (this.currentIndex < this.users.length ) {
                    this.currentIndex +=1
                }
                    this.currentIndex = 0
                }
            }
=======
        del(data){
            console.log(data);
            // let index =-1
            // for (let i = 0; i < this.users.length; i++) {
            //     if (this.user.id==this.users[i].id) {
            //         index = i  
            //     }
            // }

            // if (index >= 0) {
            //     this.users.splice(index, 1)
            //     if (index>0 && this.currentIndex >= index ) {
            //       this.currentIndex -=1   
            //     }
            // }
            //     console.log(this.users);
>>>>>>> 0d859ce4d3f52803f937d6a16c0a067064b6df0d
        }
    }
}
</script>
<style scoped>
.img-continer{
<<<<<<< HEAD
    height:200px;
=======
    height:160px;
>>>>>>> 0d859ce4d3f52803f937d6a16c0a067064b6df0d
}
.slider-container{
    /* height: ; */
}
.neoning{
    height: 40px;
    width: 40px;
    border-radius:50%;
    animation: neoning-bounce 1s ease infinite;
}
@keyframes neoning-bounce {
  0% { opacity: 1 }
  25% { opacity: .5; }
  50% { opacity: 0; }
  75% { opacity: .5;}
  100% { opacity: 1;}
}
</style>