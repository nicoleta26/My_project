import React, {Component} from 'react';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';

class Slider extends Component{
    changeSlider(event) {
        if(typeof this.props.applyChanges === 'function') {
            this.props.applyChanges(event.target.dataset.for,event.target.value);
        }
    }
    render() {
        return(
            <div className="slidecontainer" style={{marginTop:'10px'}}>
                <input type="range" min="-50"  max="50" defaultValue={this.props.defaultValue} data-for={this.props.for} className="slider" onInput={this.changeSlider.bind(this)}/>
            </div>
        )
    }

}


class Tuning extends Component {
    applyChanges(adjust,sliderValue) {
        console.log(sliderValue);
        let baseImage = document.getElementById('image');
        let img = new Image();
        let imgWidth  = baseImage.width;
        let imgHeight = baseImage.height;
        let newWidth;
        let newHeight;
        let ratio;
        // Calculate the new image dimensions, so they fit
        // inside the maxWidth x maxHeight bounding box
        let maxWidth = 500;
        let maxHeight = 500;

        if (imgWidth >= maxWidth || imgHeight >= maxHeight) {

            // The image is too large,
            // resize it to fit a 500x500 square!

            if (imgWidth > imgHeight) {

                // Wide
                ratio = imgWidth / maxWidth;
                newWidth = maxWidth;
                newHeight = imgHeight / ratio;

            } else {

                // Tall or square
                ratio = imgHeight / maxHeight;
                newHeight = maxHeight;
                newWidth = imgWidth / ratio;

            }

        } else {
            newHeight = imgHeight;
            newWidth = imgWidth;
        }
        var canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        let ctx = canvas.getContext('2d');
        ctx.drawImage(baseImage,0,0,newWidth,newHeight);
        Caman(canvas,img, function () {
            // If such an effect exists, use it:
            this[adjust](sliderValue).render();
            setTimeout(()=>{
                    let url = canvas.toDataURL();
                    document.getElementById('main').style.backgroundImage = 'url(' + url + ')';
                }
            ,100)


            //toUse.src = document.querySelector('[data-caman-id]').toDataURL();

        });
    }
    render() {
        return (
            <div className="row operations" id="tuningSection">
                <div className="col-12">
                    <div className="container-fluid pt-3">
                        <div className="row" id="tuning">
                            <div className="col-12 overflow-auto d-flex flex-row flex-nowrap">
                                <div className="filter">
                                    <NavLink activeClassName='active' to="/tuning/exposure"><i className="fa fa-adjust"></i>Exposure</NavLink>
                                </div>
                                <div className="filter">
                                    <NavLink activeClassName='active' to="/tuning/saturation"><i className="fa fa-sun"></i>Saturation</NavLink>
                                </div>
                                <div className="filter">
                                    <NavLink activeClassName='active' to="/tuning/hue"><i className="fa fa-tint"></i> Hue </NavLink>
                                </div>
                                <div className="filter">
                                    <NavLink activeClassName='active' to="/tuning/vibrance"><i className="fa fa-thermometer-three-quarters"></i>Vibrance</NavLink>
                                </div>
                                <div className="filter">
                                    <NavLink activeClassName='active' to="/tuning/crop"><i className="fa fa-crop"></i>Crop</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <HashRouter>
                                    <div>
                                        <Route exact path='/tuning/exposure' component={Slider} component={() => <Slider for={'exposure'} defaultValue={0} applyChanges={this.applyChanges.bind(this)} />}/>
                                        <Route exact path='/tuning/saturation' component={Slider} component={() => <Slider for={'saturation'} defaultValue={0} applyChanges={this.applyChanges.bind(this)} />}/>
                                        <Route exact path='/tuning/hue' component={Slider} component={() => <Slider for={'hue'} defaultValue={0} applyChanges={this.applyChanges.bind(this)} />}/>
                                        <Route exact path='/tuning/vibrance' component={Slider} component={() => <Slider for={'vibrance'} defaultValue={0} applyChanges={this.applyChanges.bind(this)} />}/>
                                    </div>
                                </HashRouter>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export {Tuning}