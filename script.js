(function (global, $) {
    // 'new' an object
    var CropPortalLibrary = function () {
        return new CropPortalLibrary.init();
    }
    CropPortalLibrary.prototype = {

        /**
         * We need the data to show the example so I Created this random function which is creating a lot of random data.
         * however this random data is even not random I get to know because it will give the same stracture every time you will run it.
         * We can use this stracture to show the manual component I have created.
         */
        randomData: function () {
            var randomMapData = [];
            for (var i = 0; i <= 10000; i++) {

                // this is just to have random data do not spend time to understand it because it is just have no meaning.
                randomMapData[i] = {
                    x: -this.getrandom((5 + 80 * Math.cos(Math.PI * i / 5 - Math.PI / 2)), this.getrandom(30, 28)),
                    y: -this.getrandom(this.getrandom(90, (5 + this.getrandom(21, 900) * Math.sin(Math.PI * i / 5 - Math.PI / 2))), this.getrandom((this.getrandom((5 + 80 * Math.sin(Math.PI * i / 5 - Math.PI / 2)), 50) + this.getrandom(90, 50) * Math.sin(Math.PI * i / 5 - Math.PI / 2)), 20)),
                    elevation: this.getrandom((5 + this.getrandom(90, 1) * Math.cos(Math.PI * i / 20 - Math.PI / 2)), (5 + 80 * Math.sin(Math.PI * i / 5 - Math.PI / 2))),
                    datum: this.getrandom(900, 100),
                }
            }
            for (var i = 10000; i <= 20000; i++) {

                //this is just to have random data do not spend time to understand it because it is just have no meaning.
                randomMapData[i] = {
                    x: -this.getrandom((5 + 810 * Math.cos(Math.PI * i / 5 - Math.PI / 2)), this.getrandom(30, 28)),
                    y: -this.getrandom(this.getrandom(90, (5 + this.getrandom(21, 90) * Math.sin(Math.PI * i / 5 - Math.PI / 2))), this.getrandom((this.getrandom((5 + 80 * Math.sin(Math.PI * i / 5 - Math.PI / 2)), 50) + this.getrandom(90, 50) * Math.sin(Math.PI * i / 5 - Math.PI / 2)), 20)),
                    elevation: this.getrandom((5 + this.getrandom(90, 1) * Math.cos(Math.PI * i / 20 - Math.PI / 2)), (5 + 80 * Math.sin(Math.PI * i / 5 - Math.PI / 2))),
                    datum: this.getrandom(900, 100),
                }
            }
            return randomMapData
        },

        /**
         * this function is to support the randomeMapData function.
         */
        getrandom: function (max, min) {

            return Math.random() * (max - min) + min

        },
        mapData: function (result) {
            var series = {
                x: [],
                y: [],
                z: [],
                elevation: [],
                color: [],
                text: [],
                zeroelevation: [],
            };

            /**
             * The resule variable was have data in stracuter of [{x:,y:,z:}] and this loop will make it in form of {x:[],y:[],z:[]}
             * which we need as plotly accept this form. So by running this loop we are achiving it. 
             * We also can implement the result.Map() function but this method is working for now. If you want to change you can for your project.
             */
            for (var i in result) {
                series.x.push(result[i].x);
                series.y.push(result[i].y);
                if (result[i].elevation == null) { } else {
                    series.elevation[i] = result[i].elevation;
                }
                series.color.push(result[i].datum);
                series.text.push('Longitude: ' + result[i].x + '</br></br>Latitude: ' + result[i].y + '</br>Datum: ' + result[i].datum);
                series.zeroelevation.push(2);
            }
            return series
        },

        /**
         * We are using callback fucntion here which will run after getting all the parameters required to draw the 3d Scatter Plot Graph.
         * It will run the call back funtion with parameter which are required.
         * By this way I am tring to make sure that create plotly will run only after all the data and required parameters are exsit.
         */
        create3dScatterPlot: function (selector, result, type, callback) {

            var series = this.mapData(result);

            /**
            * Here I am checking the elevation data which our project need to check.
            * because some field do not have elevation data so in that case we will disable the button who can show this kind of data.
            */
            if (series.elevation == null || series.elevation < (series.x.length) / 2) { series.elevation = []; $("#elevation").prop('disabled', true); }

            //Map figure for later use. Actully I was planning to have two way of showing the graph one by 3d scatter and another on map it self. 
            // So this extra vaiable is to show map graph.
            var figure1 = "";

            /**
             * this is one of the stracutred parameter for plotly function. which required frame,layout and data objects. 
             * I have create saprate function to create layout because we some time need it to call individually. 
             * I have created some my own objects( _Elevation,_zero) here which plotly do not need but I need them so I am embeding it in this figure variable.
             *
             */
            var figure = {
                frames: [],
                layout: this.resetLayout(),
                data: this.plotlyData(series,type),
                selector: document.getElementById(selector)
            };
            if (callback) {
                // pass chart object back to callback function so we can use this figure variable to draw the plotly graph.
                callback(figure, figure1);
            }

        },

        plotlyData: function (series, type) {
            var data = [
                {
                    hoverinfo: 'text',
                    autobinx: true,
                    name: type,
                    text: series.text,
                    marker: {
                        symbol: 'square',
                        color: series.color,
                        colorbar: {
                            thicknessmode: 'pixels',
                            thickness: 10,
                            len: 400,
                            lenmode: 'pixels',
                            yanchor: 'center',
                            xpad: 0,
                            y: 80,
                            outlinecolor: 'pink',
                            ticks: 'inside'

                        },
                        colorscale:
                        [['0', 'red'],
                        ['0.5', 'yellow'],
                        ['1', 'green']],
                        sizemode: 'diameter',
                        size: 4
                    },
                    type: 'scatter3d',
                    x: series.x,
                    y: series.y,
                    z: series.zeroelevation,
                    autobiny: true,
                    mode: 'markers',
                    _Elevation: series.elevation,
                    _zero: series.zeroelevation
                }
            ]
            return data;
        },

        /**
         * This function is to create the layout for plotly graph. which created sapreatly as it will help to set defualt layout
         *  if by any reason it get change. That is the case when I was tring to make plotly large on full screen but when it was coming to original position
         * its layout was not getting reset so I create this funtion for it.
         * 
         */
        resetLayout: function () {
            var layout;
            layout = {
                title: "",
                margin: {
                    l: 0,
                    r: 0,
                    b: 0,
                    t: 50,
                    pad: 0
                },
                autosize: true,
                paper_bgcolor: 'rgba(158, 216, 255,0.1)',

                //  title: 'Crop Portal',
                scene: {
                    yaxis: {
                        title: 'Latitude',
                        titlefont: {
                            family: '\"Open Sans\", verdana, arial, sans-serif',
                            size: 15,
                            color: '#444',
                        }
                    },
                    zaxis: {

                    },
                    xaxis: {
                        title: 'Longitude',
                        titlefont: {
                            family: '\"Open Sans\", verdana, arial, sans-serif',
                            size: 15,
                            color: '#444'
                        }
                    },
                    aspectmode: 'manual',

                    aspectratio: {
                        y: 2.5,
                        x: 2.5,
                        z: 1.5
                    },
                    camera: {
                        eye: {
                            y: 0,
                            x: 0,
                            z: 4.5
                        },
                        up: {
                            y: 0,
                            x: 1,
                            z: 0
                        },
                        center: {
                            y: 0,
                            x: 0,
                            z: 0
                        }
                    }
                },
                breakpoints: [],

                hovermode: 'closest'
            }
            return layout;

        },

        /**
         * I some time need to redraw the plotly  graph while user was selecting different map in dropdown list.
         * So instead of running whole crete3dscatter plot I tried to run only this part where I getting the required stracture of data.
         * This data then I will embed in existing drawn graph. It save time and memory.
         */
        redraw: function (result, callback) {
            var series = this.mapData(result);
            if (series.elevation == null || series.elevation < (series.x.length) / 2) { series.elevation = []; $("#elevation").prop('disabled', true); }
            var selector = document.getElementById("chart");
            selector.data[0].x = series.x;
            selector.data[0].y = series.y
            selector.data[0].z = series.zeroelevation;
            selector.data[0]._Elevation = series.elevation;
            selector.data[0].marker.color = series.color;
            selector.data[0].text = series.text;
            if (callback) {
                // pass chart object back to callback function so we can save it
                callback(selector);
            }
        },

        /**
         * This function use the elevation data of map to show the elevation. It run based on toggle button which send the elevation data on Z object of graph
         * or send the [0] array with length of same as x or y object to show no elevation.
         * so if user press the elevation it throw the elevation else throw zero.
         */
        createElevation: function (selector, caller) {

            //Create elevation or Layes based on what is cliked on client side.
            var select = document.getElementById(selector);

            if (caller.id == "layer") {

                //Here I have to provide layout agian from create3dscatterPlot because otherwise it is getting previous fullscreen layout which is bad design 
                //For Layer Clicked button.
                if (caller.name == "elevation") {
                    $("#elevation").name = "elevation";
                    var update = { z: [select.data["0"].marker.color] };
                    $(caller).css('background', '#ccc');
                    caller.name = "offTheElevation";
                }
                else {
                    var update = { z: [select.data["0"]._zero] };
                    $(caller).css('background', '#fff')
                    caller.name = "elevation"
                }
                $("#elevation")[0].name = "elevation"
                $("#elevation").css('background', 'none');
            }
            else {

                //For Elevation clicked button
                if (caller.name == "elevation") {
                    $("#elevation").name = "elevation";
                    var update = { z: [select.data["0"]._Elevation] };
                    $(caller).css('background', '#ccc');
                    caller.name = "offTheElevation";
                }
                else {
                    var update = { z: [select.data["0"]._zero] };
                    $(caller).css('background', '#fff')
                    caller.name = "elevation"
                }
                $("#layer")[0].name = "elevation"
                $("#layer").css('background', 'none');

            }
            Plotly.restyle(select, update);

        },

        /**
         * this is a toggle button to show the fullscreen graph it was required in our project where defualt graph was very small.
         * So I use the bootstrap model to make it full screen
         * I tried to make it compatible by tricking the plotly features for my purpose.
         */
        fullScreenLink: function (selector) {

            // Set the modal title back to Krige Set
            var m = document.getElementById(selector);

            //We need to set time out property because otherwise it is getting small width of fullscreen div.
            // therefore we get the width when fullscreen div is properly opened.               
            setTimeout(function () {

                $('#Lmap').find("i").css("display", "none");
                //We are creating new 3dscatterplot for fullscreen div. 
                Plotly.newPlot(Lmap, {
                    data: m.data,
                    layout: this.resetLayout(),
                    frames: m.frames
                });

                //Fullscreen is div which is hiden and showup only after clicking fullscreenlink.
                //And, to make this screen large here we are changing the layout of 3dscatter plot.
                var size = $($("#fullscreen").find(".modal-dialog")).width();
                var newupdate = {
                    autosize: false,
                    width: size * 0.95,
                    height: size * 0.69,
                    margin: {
                        l: 5,
                        r: 0,
                        b: 0,
                        t: 10,
                        pad: 0
                    }
                };
                Lmap.data[0].marker.colorbar.lenmode = 'pixels';
                Lmap.data[0].marker.colorbar.len = size * 0.4;
                Plotly.relayout(Lmap, newupdate);
            }, 300);
        },

        /**
         * Some time user want to see the map instead of . filled circle but in other symbles so I used this function to give that functionality.
         * Here I am using plotly class to show the present symbles instead of defining by my self which make My work more flexible for future.
         */
        changeASymbol: function (selector) {
            $($("#SymbolId")[0].parentElement).find("button[data-toggle='dropdown']")["0"].innerText = "Selected :" + selector.title;
            var chart = document.getElementById('chart');
            chart.layout.xaxis = { type: '-' };
            chart.data[0].marker.symbol = selector.title;
            Plotly.redraw(chart);
        },

        /**
         * this is also if user want to change the color of points. 
         */
        changeAColor: function (selector) {
            var chart = document.getElementById('chart');
            var color = [];
            var length = $(selector).find('rect').length;
            for (var i = 0; i < length; i++) {
                color.push([i / (length - 1), $(selector).find('rect')[i].attributes["0"].value]);
            }
            $(".cpl-color-range-slider .ui-slider-range").css("background", "linear-gradient(to left, " + color[2][1] + ", " + color[1][1] + ", " + color[0][1] + ")");
            $("#color-range-slider").css("background", "linear-gradient(to left, rgba(255,0,0,0), rgba(255,0,0,0), rgba(255,0,0,0))");
            chart.data[0].marker.colorscale = color;
            Plotly.redraw(chart);
        },

        /**
         * All the functionality which I have provided above was need to be execute by function but my lead want it to be embed it in plotly itself.
         * By this way it will look part of plotly so I used the d3 library present in plotly to draw those button in plotly.
         */
        scattertools: function (selector) {
            $('#chart').find("i").css("display", "none");
            var d3 = Plotly.d3;
            $(selector._fullLayout._modeBar.element).prepend(selector._fullLayout._modeBar.createGroup());
            var newgroup = d3.select(selector._fullLayout._modeBar.element.firstChild);

            // Create toggle Button to show the layers data.
            var link = newgroup.append("button")
                .attr("class", "modebar-btn btn-link")
                .attr("style", "margin:0;padding:0px 5px;color:rgba(0, 31, 95, 1)")
                .attr("name", "elevation")
                .attr("id", "layer")
                .attr("onclick", "cpl.createElevation('chart',this)")
                .html("<span data-title='Layer' ><i class='fa fa-clone'  aria-hidden='true'></i></span>");

            // create toggle button to show in fullscreen.
            newgroup.append("a")
                .attr("class", "modebar-btn")
                .attr("href", "#fullscreen")
                .attr("style", "color:rgba(0, 31, 95, 1)")
                .attr("data-toggle", "modal")
                .attr("data-container", "body")
                .attr("name", "KrigeSetId")
                .attr("id", "FullScreenlink")
                .attr("onclick", "cpl.fullScreenLink('chart')")
                .html("<span data-title='Full Screen'><i class='fa fa-arrows-alt' aria-hidden='true'></i></span>");

            // Create toggle Button to show the elevation data.
            newgroup.append("button")
                .attr("class", "modebar-btn btn-link")
                .attr("style", "margin:0;padding:0px 5px;color:rgba(0, 31, 95, 0.8) ")
                .attr("name", "elevation")
                .attr("id", "elevation")
                .attr("onclick", "cpl.createElevation('chart',this)")
                .html("<span data-title='Elevation'><i class='fa fa-arrows-v' aria-hidden='true'></i></span>");

            var dropdown = newgroup.insert("div", ":first-child").attr("class", "btn-group")

            // Create dropdown to let user slecte any symbol
            dropdown.append("button").attr("class", "btn btn-sm btn-default dropdown-toggle")
                .attr("type", "button")
                .attr("data-toggle", "dropdown")
                .attr("aria-expanded", "true")
                .attr("data-title", "Select a Symbol")
                .attr("style", "margin: 0 5px;padding:5px 5px;color:rgba(0, 31, 95, 0.8) ")
                .html("Select a Symbol...<spanclass='caret'></span>");
            var ul = dropdown.append("ul")
                .attr("class", "dropdown-menu")
                .attr("role", "menu")
                .attr("id", "SymbolId")

            var symbol = selector._fullLayout._modules["0"].markerSymbols;
            for (var k in symbol) {
                ul.append("li")
                    .attr("role", "presentation")
                    .attr("style", "cursor:pointer")
                    .attr("onclick", "cpl.changeASymbol(this)")
                    .attr("title", k).html(k + " : " + symbol[k]);
            }

            //colorprofile
            var dropdown = newgroup.insert("div", ":first-child").attr("class", "btn-group")

            //create the dropdown list of color list for graph
            dropdown.append("button")
                .attr("class", "btn btn-sm btn-default dropdown-toggle")
                .attr("type", "button")
                .attr("data-toggle", "dropdown")
                .attr("data-title", "Colour Profile")
                .attr("aria-expanded", "true")
                .attr("style", "margin: 0 5px;padding:5px 5px;color:rgba(0, 31, 95, 0.8) ")
                .html(" <i class='glyphicon glyphicon-th-large'></i> Colour Profile <span class='caret'></span>");

            var newul = dropdown.append("ul")
                .attr("class", "dropdown-menu")
                .attr("role", "menu")
                .attr("id", "color")
            var color = [['rgb(10, 10, 10)', 'rgb(178, 178, 178)', 'rgb(240, 240, 240)'],
            ['red', 'yellow', 'green'],
            ['rgb(71,17,100)', 'rgb(66,189,112)', 'rgb(221,226,24)'],
            ['rgb(46, 4, 149)', 'rgb(243, 134, 71)', 'rgb(249, 216, 36)']]

            newul.append("li")
                .attr("role", "presentation")
                .attr("style", "cursor:pointer")
                .html("<a role='menuitem' tabindex='-1' href='#' data-toggle='modal' data-target='#colormodel'>Custom</a></li>")

            for (var k in color) {
                var c = 24;
                var bb = newul.append("li")
                    .attr("role", "presentation")
                    .attr("style", "cursor:pointer")
                    .append("svg")
                    .attr("onclick", "cpl.changeAColor(this)")
                    .attr("width", "100%")
                    .attr("height", "24")
                for (var b in color[k]) {
                    bb.append("rect")
                        .attr("fill", color[k][b])
                        .attr("width", "24")
                        .attr("height", "24")
                        .attr("x", c + "%")
                        .attr("stroke", "black");
                    c += 24;
                }
            }

            // genrate all the tools created above.
            selector._fullLayout._modeBar.element.firstChild.appendChild(link.node());
            // check if data have elevation data else do not display it
            if (selector.data[0]._Elevation.length <= 0) { $("#elevation").css('display', 'none'); }

            // resize the plotly based on size of screen
            var resizeDebounce = null;
            var dd = document.getElementById('chart');
            function resizePlot() {
                var bb = dd.getBoundingClientRect();
                Plotly.relayout(dd, {
                    width: bb.width,
                    height: bb.height
                });
            }
            resizePlot();
            window.addEventListener('resize', function () {
                if (resizeDebounce) {
                    window.clearTimeout(resizeDebounce);
                }
                resizeDebounce = window.setTimeout(resizePlot, 50);
            });
        },
    }

    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    // holds all properties
    CropPortalLibrary.init = function () {
        var self = this;
    }

    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    CropPortalLibrary.init.prototype = CropPortalLibrary.prototype;

    // attach our CropPortalLibrary to the global object, and provide a shorthand '$CPL' for ease on our poor fingers
    global.CropPortalLibrary = global.$CPL = CropPortalLibrary;
}(window, jQuery));

//All the tools added in 3d scatter plot
$(function () {
    //FullScreenlink is a link provided to make screen large           

    // We need to delete the second fullscreen ploty to save memory which this functino is doing.
    $('#fullscreen').on('hidden.bs.modal', function () {
        // Set the modal title back to Krige Set 
        Lmap.layout = this.resetLayout();
        Plotly.purge(Lmap);
        $(window).off("resize");
        $('#Lmap').find("i").removeAttr('style');
    });

    // Sometime user can change the size of screen to make our scatterplot more responsive here we are changing the size of 3dscatterplot.
    // By this function, it will change the size every time user will resize the scree, only while fullscreen div is opened.
    $('#fullscreen').on('shown.bs.modal', function () {
        var resizeDebounce = null;
        var dd = document.getElementById('Lmap');
        function resizePlot() {
            var bb = dd.getBoundingClientRect();
            Plotly.relayout(dd, {
                width: bb.width,
                height: bb.height
            });
        }
        window.addEventListener('resize', function () {
            if (resizeDebounce) {
                window.clearTimeout(resizeDebounce);
            }
            resizeDebounce = window.setTimeout(resizePlot, 50);
        });
    });

    // on click of color toggle button it will show color modal.
    $('#colormodel').on('shown.bs.modal', function () {
        $('.color1').colorpicker({
            color: "#ff0000"
        });
    });
    // on slecting the color in model it will update it in plotly graph.
    $('#update-colours').click(function () {

        var chart = document.getElementById('chart');
        //Save the colour preference for the next time the user needs them
        var lowColour = $("input#low_colour").val();
        var mediumColour = $("input#medium_colour").val();
        var highColour = $("input#high_colour").val();
        var color = [['0', highColour], ['0.5', mediumColour], ['1', lowColour]];
        chart.data[0].marker.colorscale = color;
        Plotly.redraw(chart);
    });
    // To increase/decrease the size of pointer(tick) in plotly graph based on slider.
    $('#sliderPointSize').change(function (event) {
        var chart = document.getElementById('chart');
        $($('#sliderPointSize')["0"].parentNode).find('.range-value')[0].textContent = $('#sliderPointSize').prop('value');
        chart.data[0].marker.size = $('#sliderPointSize').prop('value');
        $('#textBoxPointSize').prop('value', parseFloat($('#sliderPointSize').prop('value')))
        Plotly.redraw(chart);
    });
})

