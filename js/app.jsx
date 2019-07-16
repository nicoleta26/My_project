
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Filters} from './Filters.jsx'
import {Tuning} from './Tuning.jsx'
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';




class Main extends Component {
    doFilter(e){
        var image = e.target.style.backgroundImage.replace("image/png", "image/octet-stream;").replace('url("',"").replace('")',"");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
        let a = document.createElement('a');
        a.href = image;
        a.download = "photo.png";

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // replace the image with the canvas

    }
    componentDidUpdate() {
        let url = document.getElementById('image').src;
        document.getElementById('main').style.backgroundImage = 'url(' + url + ')';
    }

    render() {

        return (
            <div className="row center-row">
                {this.props.baseImage !== null ?
                <div className="col-12 main" id="main">

                </div>
                    :
                <div className="col-12 main empty" id="main">
                    <strong>Upload photo</strong>

                </div>

                }

            </div>
        )
    }

    componentDidMount() {



        // replace the image with the canvas
    }
}

class Header extends Component {
    uploadFile(event) {
        document.getElementById('photoUpload').addEventListener('change', (e)=> {
            var file = document.getElementById('photoUpload').files;
            var reader  = new FileReader();
            reader.addEventListener("load", ()=> {

                if(typeof this.props.setUploaded === 'function'){
                    this.props.setUploaded(reader.result);
                }
            }, false);

            if (file) {
                reader.readAsDataURL(file[0]);
            }

        });
        document.getElementById('photoUpload').click();
    }

    resetPhoto(event) {
        document.getElementById('photoReset').addEventListener('change', (e) => {

        });

    }


    render() {
        return (
            <div className="row">
                <input type="file" id="photoUpload" style={{display:'none'}}/>
                <input type="file" id="photoReset" style={{display:'none'}}/>
                <div className="col-12">
                    <header>
                        <div>
                            <i className="fa fa-folder-open" onClick={this.uploadFile.bind(this)}></i>
                        </div>
                        <div>
                            <i className="fa fa-undo" onClick={this.resetPhoto.bind(this)}></i>
                        </div>
                    </header>
                </div>
            </div>
        );
    }
}

class Operations extends Component {
    render() {
        let filters = this.props.filters;

        return (

                this.props.baseImage !== null &&
                <HashRouter>
                    <div>
                        <Route exact path='/' component={Filters} component={() => <Filters filters={filters} baseImage={this.props.baseImage}/>}/>
                        <Route path='/tuning' component={Tuning}  component={() => <Tuning baseImage={this.props.baseImage}/>}/>
                    </div>
                </HashRouter>

        );
    }
}

class Footer extends Component {
    doFilter(e){
        var image = e.target.style.backgroundImage.replace("image/png", "image/octet-stream;").replace('url("',"").replace('")',"");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
        let a = document.createElement('a');
        a.href = image;
        a.download = "photo.png";

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // replace the image with the canvas

    }
    componentDidUpdate() {
        let url = document.getElementById('image').src;
        document.getElementById('main').style.backgroundImage = 'url(' + url + ')';
    }

    render() {
        return (
            this.props.hasImage &&
            <div className="row footer navbar fixed-bottom p-0 container-fluid">
                <input type="file" id="photoDownload" style={{display:'none'}}/>
                <div className="col-12 pl-0 pr-0">
                    <nav id="menu">
                        <HashRouter>
                            <button className="col-sm-4" id="filtersBtn"><Link to="/">Filters</Link></button>
                            <button className="col-sm-4" id="tuningBtn"><Link to="/tuning">Tuning</Link></button>
                            <button className="col-sm-4" id="saveBtn" onClick={this.doFilter.bind(this)}>Save</button>
                        </HashRouter>
                    </nav>
                </div>
            </div>
        );
    }
}

class App extends Component {
    state = {
        baseImage:null
    };
    setUploaded(image) {

        this.setState({baseImage:image})
    }
    componentDidMount() {
        if(this.props.baseImage !== null) {
            let url = document.getElementById('image').src;
            document.getElementById('main').style.backgroundImage = 'url(' + url + ')';
        }
    }

    componentDidUpdate() {
        if(this.props.baseImage !== null) {
            let url = document.getElementById('image').src;
            document.getElementById('main').style.backgroundImage = 'url(' + url + ')';
        }
    }

    render() {
        let filters = [
            {
                name: "Normal",
                adjust: "normal"
            },
            {
                name: "Cross Process",
                adjust: "crossProcess"
            },
            {
                name: "Pinhole",
                adjust: "pinhole"
            },
            {
                name:'Lomo',
                adjust:'lomo'
            },
            {
                name:'Sin City',
                adjust:'sinCity'
            },
            {
                name:'Orange Peel',
                adjust:'orangePeel'
            },
            {
                name: "Sunrise",
                adjust: "sunrise"
            },
            {
                name: "Glowing Sun",
                adjust: "glowingSun"
            },
            {
                name: "Hemingway",
                adjust: "hemingway"
            },
            {
                name:'Jarques',
                adjust:'jarques'
            },
            {
                name:'Old Boot',
                adjust:'oldBoot'
            },
            {
                name: "Concentrate",
                adjust: "concentrate"
            },
            {
                name: "Grunge",
                adjust: "grungy"
            },
            {
                name:'Vintage',
                adjust:'sepia'
            },
            {
                name:'Sepia',
                adjust:'vintage'
            },
            {
                name:'Nostalgia',
                adjust:'nostalgia'
            },
            {
                name:'Clarity',
                adjust:'clarity'
            }
        ];
        return (
            <>
                <img id="image" src={this.state.baseImage} style={{display:'none'}}/>
                <div className="container d-flex flex-column justify-content-start">
                    <Header setUploaded={this.setUploaded.bind(this)}/>
                    <Main baseImage={this.state.baseImage}/>
                    <Operations baseImage={this.state.baseImage} filters={filters}/>
                </div>
                <Footer hasImage={this.state.baseImage !== null}/>
            </>

        )
    }
}

document.addEventListener('DOMContentLoaded', function(event) {

    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});

