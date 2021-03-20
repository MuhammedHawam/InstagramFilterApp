import React from 'react'
import {uploadImg} from '../../utils/helper'
import style from './ImgEffect.module.scss'
import FilterControl from '../FilterControl/FilterControl'
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

class ImgEffect extends React.Component{
    state={
        imgUrl:'',
        blur:0,
        sepia:0,
        vintage:false
    }
    componentDidMount(){
        
    }
   
  applyFilter=(filter)=>{
    var canvas = document.getElementById('image');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = filter;
    let img = new Image();
    img.src = this.state.imgUrl;
    img.onload = function () {
       
       ctx.drawImage(img,0,0, canvas.width, canvas.height);
    }
   
    return canvas;
  }
 setImgUrl=(url)=>{
     console.log(url)
     this.setState(()=>({imgUrl:url}))
     this.applyFilter("sepia(0%)")
    }
 onBlurChange=(value)=>{
    this.setState(()=>({blur:value,vintage:false}))
    this.applyFilter(`blur(${value}px) sepia(${this.state.sepia}%)`)
    }
 onSepiaChange=(value)=>{
    this.setState(()=>({sepia:value,vintage:false}))
    this.applyFilter(`blur(${this.state.blur}px) sepia(${value}%)`)
    }

 handleVantageChange=(event)=>{
        this.setState(()=>({vintage:event.target.checked}))
        if(event.target.checked){
            
            this.applyFilter("blur(0.05em) saturate(0.7) contrast(1.5) brightness(1.2)")
        }else{
            debugger;
            this.applyFilter(`blur(${this.state.blur}px) sepia(${this.state.sepia}%)`)
        }
    
    }
  handelClick=()=>{
        var canvas = document.getElementById("image");
        var image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        var link = document.createElement('a');
        link.download = "my-image.png";
        link.href = image;
        link.click();
    }  
  render(){
    return (
      <div className={style.mainContainer}>
        <input
            type="file"
            name="ItemImg"
            onChange={e => {
              uploadImg(e, this.setImgUrl);
            }}
          />
        
        <div className={style.imgControls+' '+'row'}>
            <div className={style.imgContainer+' '+'col-sm-12 col-md-6'}>
                <canvas id="image" width="400px" height="400px"></canvas>
            </div>
            <div className={style.controls+' '+'col-sm-12 col-md-6'}>
            <FilterControl title='Blur' onValueChange={this.onBlurChange}/>
            <FilterControl title='Sepia' onValueChange={this.onSepiaChange}/>
            <div className={style.vintageContainer}>
                <span className={style.title}>vintage</span>
                <Checkbox
                    checked={this.state.vintage}
                    onChange={this.handleVantageChange}
                    name="checkedB"
                    color="primary"
                />
            </div>
            <Button variant="contained" className={style.btn} color="primary" onClick={this.handelClick}>
                Download
            </Button>
            </div>
        </div>
         
      </div>
    );
  }

}
  
export default ImgEffect;
