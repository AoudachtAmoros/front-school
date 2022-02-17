<template>
    <div class="absolute top-0 right-0 left-0 bottom-0 px-2 xs:px-4 sm:px-8 md:px-16 xl:px-24">
        <div class="w-full h-full flex flex-col bg-gray-300">
            <div class="flex-1 px-2 ">
                <div v-if="state==0" class="h-full w-full flex items-center justify-center">
                   <div class="flex flex-col items-center">
                        <span class="neoning bg-red-300 mx-4 "></span>
                    <h1 class="text-center font-bold w-full text-3xl py-3 px-2 ">Waiting for your father</h1>
                   </div>
                </div>
                <div v-if="state==1 && user" class="xs:px-2 sm:px-8 md:px-8 h-full w-full flex flex-col">
                    <div class="w-full flex flex-col items-center justify-center">
                        <div class="py-4 px-2 w-full flex items-center justify-center">
                            <h1 class="text-center my-2 text-3xl">Let's see dady</h1>
                            <span class="neoning bg-green-300 mx-4"></span>
                        </div>
                        <div class="w-full flex flex-col items-center sm:flex-row sm:justify-around">
                                <div class="w-4/5 md:w-1/2 xl:w-1/3 p-2 flex flex-col items-center">
                                    <div class="py-2">
                                        <h4 class="text-xl">{{user.first_name}} {{user.last_name}}</h4>
                                    </div>
                                    <div class="img-continer w-full">
                                        <ImageC :data="images[0]" />
                                    </div>
                                </div>
                                <div class="w-4/5 md:w-1/2 xl:w-1/3 p-2 flex flex-col items-center">
                                   <div v-for="(student, index) in user.students" :key="index">
                                        <div class="py-2">
                                            <h4 class="text-xl">{{student.s_first_name}} {{student.s_last_name}}</h4>
                                        </div>
                                    <div class="img-continer w-full">
                                        <ImageC :data="images[1]" />  
                                    </div>
                                   </div>
                                </div>
                        </div>
                        <div class="w-full flex justify-end mt-4">
                            <button class="py-2 px-4 rounded bg-white shadow border hover:opacity-60" @click="validate">Validate</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="">

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
        state : 0,
        paylod:{
            parentImage:'',
            studentImage:'',
            parentNane:'',
            studentName:'',
        },

        images:[
            {
                src:'data:image/png;base64,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',
                alt:'',
            },
            { 
                src:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMRERUSExMVFRUVFRYVFxcVFRcYFxkVFRUYFxUVGBUYHSggGBolGxUZITEiJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGy0lICUyLi0tLS0tLTItLS0vLS0vNS0tMC0vLS0vLS8tLy0tLS0vLTAtLS0tLS0tLS0tLS0vLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAgEEBQYHAwj/xABBEAACAQIDBAYGBwcDBQAAAAAAAQIDEQQSIQUxQVEGImFxgZEHE1KhscEUIzKSwtHhM0JicoKisiRD8GRzdLPS/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAMEBQECBv/EADIRAAIBAwEEBwgDAQEAAAAAAAABAgMEESESMUGxBTJRYXGBkRMUIqHB0fDxkqLhskL/2gAMAwEAAhEDEQA/AO4gAAEYyuRlIlAAkAAAAAAARbAJAhYkmAVAAABS/aVB3AAAOAjGV1cjKRKO4AkAAAAAAARbAJAgiSYBUAAA85SJSWhSMQBGJMAAAAAAAAEETKNAESx2ntejhknVnZvckm5PuS+JeVJqEXJvSKbb7FqzkO0sbLEVZVZb5PRezH92K7Ev+alq1t/ayedyKl3c+xisb2bdjena3UqTfbN2/tje/mjW9o9IcTX+1UaXsx6sfdq/FsxhCtUUYuT3JXZqQt6VPVL1MmdzWq6N+SKy11evee+FxlSk705yg/4ZNea3PxNent/lT85fki52btX1ssrWV2utbrTwPMbyjUlsJ5z3PHzWCWfR9xSi6jjjHesr0eTq/RbpKsR9VUsqqWj3KaW+y4S5rxXZsknc4xSqOMlKLaad01vTW5nWdh45YihCrxatJLcpJ2ku66KF5bqm9qO5/Jl2yuXUWzLevmZCMSQBSL4AAAAAAIRJlGgCJJIJFQAAAAAAAAAAAAAAAAAADE9KKmXB1nzjl+81H5nKTqHTGcVgqzlJRWVat23STt36HJtl4xYjEQo007Ntyk9LRiryaXhbXizQta9OjSbm+Pnu7DOurWtXqpU45038N74/Tf2FyI7PlimsPCUYyqaJzdlp1tePAye3ui06izYeq4NLWEm8r7cy1T7Hddxo+P2JiKTvUozXalmXfmjde88T6Upzi4wW/t0+/MsUehqkJRnOaWGnos7u945HQsJ6KaUVfEYqT/7cY00vGea/foWe29ibMwVNzpYnPVTUcrrQm7N2l1IK+457QyOVq2bLuuvtRfNJ7+1cuKdi8xexqkIqrG1ajwqUtVblJb6b/mW/mUIVNiSaWpq1KDqRcZSeHppoZd7Xo+1/bL8jpPo0xcamGqZZXSqtcVa8IPczn/SbYuG+iQxWFVopxvaTd4yeXW7dpKTS8zMehTE2q4ml7UKc1/S5Rf8AkieV9OvHZaS8nnmU10ZSt3twbz3tY5I6yACIAAAAAAAAAAAAAAAAAAAAAAAAAAAAxm3tr0sHQniKrtGC3L7UpPSMIri29P0Mmc59NOBrVcLSlTjKUKdRyqKKu1eNozaXBXkm+GY904qU1FnictmLaOZ9JOlNfaFZTqu0Ff1dKL6kF+KXOT9y0M36NqV8TOXs0mvGUo/kzVsNsfESp+vjRlKmlfMlvS3tLe12pG/ejTBtU6tZ/vyUI90L3a8ZW/pHSOysKON2NODz/pa6O2tl7Wd+fLH+G1Y3HU6KTqTUU9Ffe+5LV+B6YXERqRjOEs0ZK6a4o88ZL1cZVcseqknKU4wSTdoxzy0TcnoeOxNprFUY1oxcVK6s+Di7PXiZOz8OTTUlnGS9lBPek+9FlPalCFT1TqRjPRZXprL7Kvuu7rS5fmH27teNCUKdSmpRquMXHNHNlm5RUnSerg3Fq/5q6MXLRISklvHSfDxeDxCUUvq5TdklrHrXfb1TA+hhf62r/wCPL/2UzcsTh1OEqb3SjKD7mmn8TXPRFh1Qnip1WouLhR19qLk5/hJ7eSWckFwvh0OrAhGSaundPc0TLhmAAAAAAAAAAAAAAAAAjJgEgQt3kkwCoAAAAAAAAOf7bz060krrV2tu333dzR74NpUllioqz6qVle+vvuzY9sbLVfVaSW58zCrBSopRkrb2t26/YZ9Sk4N9hrUq8akV29h50sSnGVOpTjUp1FaUJK6a4HoowjFQp0404RVowgrJXbb8W23cJHmk1fin5r5WPG28bPAk2Y7W0lqTi3xVvG4xUqUvVzqYenUqUv2dSSu4W1XDg9SOZ8Ivxa+RWnGy33EZuO4ShGXWRClWcnr5mKxc2qklDq3km7aXlZK75vRLwM2kXGzujz9Y51d127XTvfu4CMJTeEdlVhDWRmNjxaowv2vwbbXuL8gly8iSZpRWEkY0pbUm+0qADp5AAAAAABGLurkXK5KK0AJAAAEUSKNAESSQSKgAAAAAAA83K5OSuUjEARiW+Nwiqxs9Gtz5foXQONJrDOxk4vKNWxGEnTfWWnNbvM8Tbmrmq9KqyoZPVwWaTbavZZV2cHd+5lOrQ2VtJmhQuHNqLWp5iEG3ZJt8kYjCbYcqsIyp2g5JSd29G7XvpbmdAo0YwVopL/nPieKVLb4klet7LRox2z9mWanPetUu3mzKRJlGi9CCisIzZ1JTeZESSQSKno8AAAAAAA85O5KSuIxAEYkgAAAAAAAAAAAAAAAAAAAAa3tvpZRw7cI/W1FvUWrRfKUuD7FdmO6c7aq0rUafUU4ZnNPVq7TjH2d2r36rcaCZl3fODcKe/izZsOjFUiqtXc9yX1/M+BtGJ6b4md1FU6fJxi2/OTav4Gty6RV87eKcqvBTSirLlaKSt7zzJbzO96qvrPJr+50V1YpeX4yeI6QQtampSk9ytZePEy2yul+MpxWecaj5ShHRcrws35mFjBLgigd1P/y8BWlN9dJ+KOmdH+llPEtU5L1dR7le8ZdifB9j95s5w1M6V0O6QfSIerqP62C3+3H2u9cfPiaNneuo9ipv4Pt/3mY/SHRypL2lLdxXZ3ru5ctoABpmOAAAAAAAAAAAAAAAAAAAAAAAAAAAADzrVMsXLkrgGtdLMHHE2hezh9mXKT3ru3Gh7Q2VVoJOpG0W7RkmmpNcuJ0KhTdSduLd2/izA+kaqs1Gkt0YSlb+ZpL/AAZjXdNTjKs9+7x/Rv2FaUJxoLdq33fs00kCJmG2T395AEt4BEyGw41fX03R+2pJp8Fweb+Gz1LGLtra9tbc7cDpUsFCn+ziowks0bK2j+JPb0XUbed2Pz5FW6uFSSi1naz4d+fU2cFvg6ueCfG1n3rRlwfSJ51Pj2sPAAB0AAAAAAAAAAAAAAAAjGVyLlclBAEgAAAAACx2vO1O3NpeWvyL4w21pOU1Fa5Vfz3/ACI6zxBktGOZoutk4fLHM98vhwNU6R4GhicRL/UKnVjaGWorR03Wk7c3uubnhl1I88q+BoW2dvyoVvo+MpUKjks8NVdwcmk4trTc1uT0K1xGPs1FrK8G/wDnVeOqLllKTrSknh8NUn5bWj04ZT7DGYropioaqCmucJJ+52fuMfU2VXj9qjVXfTl8bGw4fGYL/bq4jCvlGUst+5ZtPIydDEy/c2lTfZUjTv72mZyt6U9Yv0lF89lmy7mtDSa9YyXLaXzNGWDqP/bn9x/kXVDYeIn9mhU8YuK85WRvKr1+ONw1ueVf/RbVcXGP7TaF+yiqafnFSZ69yhHWTf8AVfVnj36b6qX93yiuZgqfRScY58RUp0YcW2m+7fa/ibrhYRq4WGRuSjFKMpKzkodW9rLfb4Gm7R6S4PD9dQ9ZNf7mIk34pNtvuSRu2wo11TbxGXO5NpR/djZWi7aaO/F95atIU02oLKfHVr16vkk/EoX86uwpTeGnonhP+Or82/LUlsappKPKz89PkZJO6MJgZtTT9q68+XiZxIuUHmBm3CxNlQATEIAAAAIN37gCYIWJJgFQAADzcrk2ikYgCMSQAAAAAAAALKVFqqpJaNNP5P3F6UaONZOp4POnCyt328zjvpyor6Th5c6Ml92d/wAR2ZI5J6dKfXwj5xrrydJ/Ms2mlVLx5Fe51ps5jRxVSGkKko9nDy3F3T23XW+af9K+VjHlGy/Us6FV5nCL8Unz1K1K9uKSxCpJJdjePTcZJ7er84/diW9TamIlvqPwSj/ikXvSXYFXA1YUqtm50oVVa9utdOPepJrwvxMSR0rG0WJwhHxwvsSVOkLx/DOpL+T+4pYfPNRd25SS7dXbefVNVZk14HzJsOF8TQj7ValH71SK+Z9PqJFfYzFHbTi/AtPo3XjpaMFp38vcXoBQSwXHJsAA6cAAABCJMo0ARJJBIqAAAAAAAAAAAAAAAAAAADl3p0pfVYWfKpUj96MX+A6iY3bexaGMp+qr01ON7q904ytbNGS1T14ElGahNSZ4qQ24uJ8yb+/4/qXvR/DetxeHp2up16UX3OpHN7rm9bZ9GMVOSoV2km7RqK/HTrxt8GV6IdAsVTxtGtN0nClPPLLOTbSTtZOK1vY0PfaEk8S110Kbs60Wm46aal36dMNrhaq5VYP+yUfxHK0uJ3r0m9HauOw9NUsmanUzvPJpZXCSdmk9btHPsL6Na0n9bWhFfwqU378qRHRuqVOmlOWPzuySVLarUm3COfT6mudEaTntDCL/AKii/CNSMn7kfTBpvRHoNhMKo1lF1Kyu1Oo75dWurFWiu+1+03Ir3FeNVpx3YJaNKVNNSAAK5MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYHacbVX22fu/Q9ti/al3L4jbMesnzVvJ/qV2L9qXcvmU0sVsd/wBC83mh5GQxv7OXczXTYsZ+zl/K/ga/FXduegud6OWvVZsOFjaEV/CvgexSxUuYxoU28vIAAOAAAAAAAAAAAAAAAAAi2ASBDKSTAKgAAAAAAFGwCpGMrlrjMRki5WlK25QV5N8kjU8bt7FyzJYatCP7uWEr2aknmlbR6prLuceJHOqob8+SbJqNCdXq482lz/XeZpbVo1qsqSlecMyacZK2V2lZtWepfYWKjLSyv77HMamHxTqSqRpVYSk23khUWsnd7lfV6mc6J4HE/S41a0aloxnrUvfWLVutrxKlK8nJ7LpvLe/HDt1zw3l6v0dCEXNVdEs4bTbeNy1S36LQ3rFvq9+nffgYvFVadGDqTtGMbXdm7XaS0SvvaIdM8LOrhXGmm5KcZWW/R8DQK2ExjjllDENcmqjj5biSvdOk3FU29NHw8H+yG1sY10pOqlrquOO7Xj4HUtnY6nXpqpTlmi7q9mtU7PRpPeXhzjY+PxdGCgsPVtFO1qc2m1nazJrjKabatpFI2zY21alVKNWjOnO19zyPub1T7H5nqjcKaSec+DxyPNzaOk20048PiWceH2RmwQy+ZJMslMqAAAAAAARlKwBST8ySPNK56gAAAAiSKNAESSQSKgAAAAAAA83K5NopGNgAo8ynq1yXkTAGEefqo8l5FVBLckTB3JzCItX3kfVR5LyPQHDuEzz9VHkvIRglwsehRoZOYRGxJIJFQdAAAAAAIylYgtSco3KpABIqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/2Q==',
                alt:'',
            }
        ],
        test:{
            parentName:'El Allaoui Hamid',
            studentName:'El Allaoui Soufiane'
        },
        user :null
    }
    },
    created(){
        this.socket = SocketioService.setupSocketConnection();
    },
    mounted(){
        console.log('studentArea');
        this.socket.emit('studentArea')
        this.socket.on('studentEvent',(data)=>{
            this.newstudent(data)
        })
        this.socket.on('actionDone',()=>{
            this.actionDone()
        })
       
    },
    methods:{
        validate(){
            this.socket.emit('studentDone')
            this.state = 0
            this.user = null
        },
        newstudent(data){
            this.state = 1
            this.user = data.data
        }
    }
}
</script>
<style scoped>
.img-continer{
    height:360px;
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