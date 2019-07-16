import React, {Component} from 'react';

class Filter extends Component {
    state = {
        url:''
    };
    doFilter(adjust,event){
        let img = new Image();
        let imgWidth  = event.target.width;
        let imgHeight = event.target.height;
        let newWidth;
        let newHeight;
        let ratio;
        let toUse = event.target;
        // Calculate the new image dimensions, so they fit
        // inside the maxWidth x maxHeight bounding box
        let maxWidth = 100;
        let maxHeight = 100;

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
        ctx.drawImage(event.target,0,0,newWidth,newHeight);
        Caman(canvas,img, function () {
            // If such an effect exists, use it:
            this[adjust]().render();
            setTimeout(()=>{
                let url = canvas.toDataURL();
                toUse.previousElementSibling.style.backgroundImage = 'url(' + url + ')';
            },2000)

            //toUse.src = document.querySelector('[data-caman-id]').toDataURL();

        });
    }

    bigFilter(adjust,event){
        document.getElementById('main').style.backgroundImage = 'url(./assets/loader.svg)';
        let img = new Image();
        let imgWidth  = event.target.nextElementSibling.width;
        let imgHeight = event.target.nextElementSibling.height;
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
        ctx.drawImage(event.target.nextElementSibling,0,0,newWidth,newHeight);
        Caman(canvas,img, function () {
            // If such an effect exists, use it:
            this[adjust]().render();
            setTimeout(()=>{
                let url = canvas.toDataURL();
                document.getElementById('main').style.backgroundImage = 'url(' + url + ')';
            },300)

            //toUse.src = document.querySelector('[data-caman-id]').toDataURL();

        });
    }

    render() {
        console.log(this.props)
        return (
            <div className="filter">
                <a href="#" className="filter-btn" style={{backgroundImage:'url(./assets/loader.svg)'}} onClick={this.bigFilter.bind(this,this.props.adjust)}></a>
                <img style={{display:'none'}} src={this.props.url} onLoad={this.doFilter.bind(this,this.props.adjust)}/>
                <span>{this.props.name}</span>
            </div>
        );
    }
}

class Filters extends Component {

    render() {
        console.log('filter',this.props.filter);
        let {filters} = this.props;
        return (
            <div className="row operations" id="filterSection">
                <div className="col-12">

                    <div className="container-fluid pt-3">
                        <div className="row" id="filters">
                            <div className="col-12 overflow-auto d-flex flex-row flex-nowrap">
                                {
                                    filters.map((el,index)=>{
                                        return <Filter key={'el' + index}name={el.name} adjust={el.adjust} url={this.props.baseImage}/>
                                    })

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export {Filters}