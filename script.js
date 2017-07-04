(function (global, $) {
    // 'new' an object
    var CropPortalLibrary = function () {
        return new CropPortalLibrary.init();
    }
    CropPortalLibrary.prototype = {
        randomData: function () {

            var randomMapData = [];
           
            for (var i = 0; i <= 10000; i++) {

//this is just to have random data do not spend time to understand it because it is just have no meaning.
                randomMapData[i] = {
                   x: -cpl.getrandom((5 + 80 * Math.cos(Math.PI * i / 5-Math.PI/2)),cpl.getrandom(30,28)), 
                    y:-cpl.getrandom(cpl.getrandom(90,(5 + cpl.getrandom(21,900) * Math.sin(Math.PI * i / 5-Math.PI/2))),cpl.getrandom((cpl.getrandom((5 + 80 * Math.sin(Math.PI * i / 5-Math.PI/2)),50) + cpl.getrandom(90,50) * Math.sin(Math.PI * i / 5-Math.PI/2)),20)),
                     elevation:cpl.getrandom((5 + cpl.getrandom(90,1) * Math.cos(Math.PI * i / 20-Math.PI/2)),(5 + 80 * Math.sin(Math.PI * i / 5-Math.PI/2))), 
                     datum:cpl.getrandom(900,100),
                }
            }
             for (var i = 10000; i <= 20000; i++) {

//this is just to have random data do not spend time to understand it because it is just have no meaning.
                randomMapData[i] = {
                   x: -cpl.getrandom((5 + 810 * Math.cos(Math.PI * i / 5-Math.PI/2)),cpl.getrandom(30,28)), 
                    y:-cpl.getrandom(cpl.getrandom(90,(5 + cpl.getrandom(21,90) * Math.sin(Math.PI * i / 5-Math.PI/2))),cpl.getrandom((cpl.getrandom((5 + 80 * Math.sin(Math.PI * i / 5-Math.PI/2)),50) + cpl.getrandom(90,50) * Math.sin(Math.PI * i / 5-Math.PI/2)),20)),
                     elevation:cpl.getrandom((5 + cpl.getrandom(90,1) * Math.cos(Math.PI * i / 20-Math.PI/2)),(5 + 80 * Math.sin(Math.PI * i / 5-Math.PI/2))), 
                     datum:cpl.getrandom(900,100),
                }
            }
           
            return randomMapData


        },
        getrandom:function(max,min){

return  Math.random() * (max - min) + min

        },
        create3dScatterPlot: function (selector, result, type, callback) {

            var series = {
                x: [],
                y: [],
                z: [],
                elevation: [],
                color: [],
                text: [],
                zeroelevation: [],
            };
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

            if (series.elevation == null || series.elevation < (series.x.length) / 2) { series.elevation = []; $("#elevation").prop('disabled', true); }
            //if (result.Elevation.length <= 0) { series.elevation = [];}
            //Map figure for later use
            var figure1 = "";


            var figure = {
                frames: [],
                layout: cpl.resetLayout(),
                data: [

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
                ],
                selector: document.getElementById(selector)
            };
            if (callback) {
                // pass chart object back to callback function so we can save it
                callback(figure, figure1);
            }

        },
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
        redraw: function (result, callback) {
            var series = {
                x: [],
                y: [],
                z: [],
                elevation: [],
                color: [],
                text: [],
                zeroelevation: [],
            };

            for (var i in result) {
                series.x.push(result[i].x);
                series.y.push(result[i].y);
                if (result[i].elevation == null) { } else {
                    series.elevation[i] = result[i].elevation;
                }
                series.color.push(result[i].datum);
                series.text.push('Longitude: ' + result[i].x + '</br>Latitude: ' + result[i].y + '</br>Datum: ' + result[i].datum);
                series.zeroelevation.push(2);
            }

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
        redraw: function (result, callback) {
            var series = {
                x: [],
                y: [],
                z: [],
                elevation: [],
                color: [],
                text: [],
                zeroelevation: [],
            };

            for (var i in result) {
                series.x.push(result[i].x);
                series.y.push(result[i].y);
                if (result[i].elevation == null) { } else {
                    series.elevation.push(result[i].elevation);
                }
                series.color.push(result[i].datum);
                series.text.push('Longitude: ' + result[i].x + '</br>Latitude: ' + result[i].y + '</br>Datum: ' + result[i].datum);
                series.zeroelevation.push(2);
            }

            if (series.elevation == null || series.elevation < (series.x.length) / 2) { series.elevation = []; $("#elevation").prop('disabled', true); }

            var selector = document.getElementById("chart");
            selector.data[0].x = series.x;
            selector.data[0].y = series.y
            selector.data[0].z = series.zeroelevation;
            selector.data[0].Elevation = series.elevation;
            selector.data[0].marker.color = series.color;
            selector.data[0].text = series.text;
            if (callback) {
                // pass chart object back to callback function so we can save it
                callback(selector);
            }
        },
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
                    layout: cpl.resetLayout(),
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
        changeASymbol: function (selector) {
            $($("#SymbolId")[0].parentElement).find("button[data-toggle='dropdown']")["0"].innerText = "Selected :" + selector.title;
            var chart = document.getElementById('chart');
            chart.layout.xaxis = { type: '-' };
            chart.data[0].marker.symbol = selector.title;
            Plotly.redraw(chart);
        },
        changeAColor: function (selector) {
            var chart = document.getElementById('chart');
            var color = [];
            var length = $(selector).find('rect').length;
            for (var i = 0; i < length; i++) {
                color.push([i / (length - 1), $(selector).find('rect')[i].attributes["0"].value]);
            }
            $(".cpl-color-range-slider .ui-slider-range").css("background", "linear-gradient(to left, " + color[2][1] + ", " + color[1][1] + ", " + color[0][1] + ")");
            $("#color-range-slider").css("background", "linear-gradient(to left, rgba(255,0,0,0), rgba(255,0,0,0), rgba(255,0,0,0))");
            //.cpl-color-range-slider .ui-slider-range {
            //    background: linear-gradient(to left, green, yellow, red);
            //}
            chart.data[0].marker.colorscale = color;
            Plotly.redraw(chart);
        },
        scattertools: function (selector) {
            $('#chart').find("i").css("display", "none");
            var d3 = Plotly.d3;
            $(selector._fullLayout._modeBar.element).prepend(selector._fullLayout._modeBar.createGroup());
            var newgroup = d3.select(selector._fullLayout._modeBar.element.firstChild);
            var link = newgroup.append("button")
                .attr("class", "modebar-btn btn-link")
                .attr("style", "margin:0;padding:0px 5px;color:rgba(0, 31, 95, 1)")
                .attr("name", "elevation")
                .attr("id", "layer")
                .attr("onclick", "cpl.createElevation('chart',this)")
                .html("<span data-title='Layer' ><i class='fa fa-clone'  aria-hidden='true'></i></span>");

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

            newgroup.append("button")
                .attr("class", "modebar-btn btn-link")
                .attr("style", "margin:0;padding:0px 5px;color:rgba(0, 31, 95, 0.8) ")
                .attr("name", "elevation")
                .attr("id", "elevation")
                .attr("onclick", "cpl.createElevation('chart',this)")
                .html("<span data-title='Elevation'><i class='fa fa-arrows-v' aria-hidden='true'></i></span>");


            var dropdown = newgroup.insert("div", ":first-child").attr("class", "btn-group")


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
            selector._fullLayout._modeBar.element.firstChild.appendChild(link.node());
            if (selector.data[0]._Elevation.length <= 0) { $("#elevation").css('display', 'none'); }

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
        //self.propertyName = "some value";
    }

    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    CropPortalLibrary.init.prototype = CropPortalLibrary.prototype;

    // attach our CropPortalLibrary to the global object, and provide a shorthand '$CPL' for ease on our poor fingers
    global.CropPortalLibrary = global.$CPL = CropPortalLibrary;



}(window, jQuery));



//All the tools added in 3d scatter plot
$(function () {
    //FullScreenlink is a link provided to make screen large           

    //To save memory we are deleting the newly created 3dscatter plot when we are hiding the fullscreen div
    $('#fullscreen').on('hidden.bs.modal', function () {
        // Set the modal title back to Krige Set 
        Lmap.layout = cpl.resetLayout();
        Plotly.purge(Lmap);
        $(window).off("resize");
        $('#Lmap').find("i").removeAttr('style');
    });
    //Sometime user can change the size of screen to make our scatterplot more responsive here we are changing the size of 3dscatterplot.
    //By this function, it will change the size every time user will resize the scree, only while fullscreen div is opened.
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


        //$(window).on("resize", function () {
        //    var size = $($("#fullscreen").find(".modal-dialog")).width();
        //    var newupdate = {
        //        uid: "new",
        //        autosize: true,
        //        width: size * 0.95,
        //        height: size * 0.8,
        //    };

        //    Plotly.relayout(Lmap, newupdate);
    });
    $('#colormodel').on('shown.bs.modal', function () {
        $('.color1').colorpicker({
            color: "#ff0000"
        });

    });
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

    $('#sliderPointSize').change(function (event) {
        var chart = document.getElementById('chart');
        $($('#sliderPointSize')["0"].parentNode).find('.range-value')[0].textContent = $('#sliderPointSize').prop('value');
        chart.data[0].marker.size = $('#sliderPointSize').prop('value');
        $('#textBoxPointSize').prop('value', parseFloat($('#sliderPointSize').prop('value')))
        Plotly.redraw(chart);
    });
})

