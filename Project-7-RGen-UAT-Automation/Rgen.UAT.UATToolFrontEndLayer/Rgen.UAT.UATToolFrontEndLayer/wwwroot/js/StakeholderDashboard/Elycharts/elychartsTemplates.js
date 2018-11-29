(function ($) {

$.elycharts.templates['line_basic_1'] = {
  type : 'line',
  margins : [10, 10, 20, 50],
  series : {
    serie1 : { color : 'red' },
    serie2 : { color : 'blue' }
  },
  defaultAxis : {
    labels : true
  },
  features : {
    grid : {
      draw : true,
      forceBorder : true
    }
  }
};

$.elycharts.templates['line_basic_2'] = {
  type : 'line',
  margins : [10, 10, 20, 50],
  defaultSeries : {
    plotProps : {
      "stroke-width" : 4
    },
    dot: true,
    dotProps : {
      stroke : "white",
      "stroke-width" : 2
    }
  },
  series : {
    serie1 : { color : '#a2bf2f' },
    serie2 : { color : '#2f69bf' }
  },
  defaultAxis : {
    labels : true
  },
   axis : {
      x : { labelsRotate: 0, labelsProps : {font: '12px Segoe UI Light' } }
    },
  features : {
    grid : { draw : true, forceBorder: true, ny: 5 },
    legend : {
      horizontal : false,
      width: 80,
      height: 50,
      x : 220,
      y : 250,
      dotType : 'circle',
      dotProps : {
        stroke : 'white',
        "stroke-width" : 2
      },
      borderProps : {
        opacity : .3,
        fill: '#c0c0c0',
        "stroke-width": 0
      }
    }
  }
};

$.elycharts.templates['line_basic_3'] = {
  type : 'line',
  style : { "background-color": "black" },
  margins : [10, 10, 20, 30],
  defaultSeries : {
    rounded : false,
    plotProps : {  "stroke-width" : 2 },
    dot : true,
    dotProps : { stroke : "black", "stroke-width" : 2 },
    tooltip : {
      frameProps : { opacity : .75 }
    }
  },
  series : {
    serie1 : { color : 'red' },
    serie2 : { color : 'blue' }
  },
  defaultAxis : {
    labels : true,
    labelsProps: { fill : 'white' },
    labelsAnchor : "start",
    labelsMargin: 5
  },
  axis : {
    l : {
      titleProps : { fill : 'white'},
      titleDistance : 15,
      labels : false
    }
  },
  features : {
    grid : {
      draw : [false, true],
      forceBorder : true,
      props : { stroke : '#A0A080' },
      extra : [0, 0, 10, 0]
    }
  }
};

$.elycharts.templates['line_basic_4'] = {
  type : 'line',
  margins : [10, 10, 20, 50],
  defaultSeries : {
    plotProps : {
      "stroke-width" : 4,
      "stroke-dasharray" : "-"
    },
    dot: true,
    dotProps : {
      stroke : "white",
      "stroke-width" : 2
    },
    tooltip : {
      frameProps : { stroke : "yellow", opacity : .75 }
    },
    highlight : {
      newProps : { fill : "white", stroke : "yellow", r : 8 }
    },
    startAnimation : {
      active : true,
      type : 'avg',
      speed : 1000
    }
  },
  series : {
    serie1 : { color : 'green' },
    serie2 : { color : 'blue' },
    serie3 : { color : 'red', startAnimation : { type : 'reg', delay : 1000, easing : 'elastic' } }
  },
  defaultAxis : {
    labels : true
  },
  features : {
    mousearea : { type : 'index' },
    highlight : {
      indexHighlight : 'auto',
      indexHighlightProps : { "stroke-dasharray" : "-", "stroke-width" : 2, opacity : .5 }
    },
    grid : {
      draw: [true, false],
      props : {
        "stroke-dasharray" : "-"
      }
    }
  }
};

$.elycharts.templates['line_basic_5'] = {
  type : 'line',
  margins : [50, 50, 50, 50],
  style : { "background" : "url(sites/elycharts.com/files/sky.jpg)" },
  defaultSeries : {
    plotProps : { opacity : .6 },
    highlight : {
      overlayProps : { fill : 'white', opacity : .5 }
    },
    startAnimation : {
      active: true,
      type : 'grow'
    },
    tooltip : {
      frameProps : false,
      height: 20,
      offset : [10, 0],
      contentStyle : 'font-weight: bold'
    }
  },
  series : {
    serie1 : { color : 'red' },
    serie2 : { color : 'blue' }
  },
  defaultAxis : {
    labels : true
  },
  features : {
    grid : {
      draw : [true, false],
      forceBorder : false,
      evenHProps : { fill : 'yellow', opacity : .2},
      oddHProps : { fill : 'green', opacity : .2}
    }
  }
};

$.elycharts.templates['line_basic_6'] = {
    type : 'line',
    margins : [10, 40, 40, 60],
    defaultSeries : {
      highlight : {
        newProps : { r : 8, opacity : 1 },
        overlayProps : { fill : 'white', opacity : .2 }
      },
      startAnimation : {
      active : true,
      type : 'grow'
    }

    },
    series : {
      serie1 : { color : '#008000', tooltip : {frameProps : { "stroke" : "#008000" } } },
      serie2 : { color : ' #ff0000', tooltip : {frameProps : { "stroke" : " #ff0000" } } },
      serie3 : { color : '#ffa500', tooltip : {frameProps : { "stroke" : "#ffa500" } } },
	 // serie4 : { color : 'red', tooltip : {frameProps : { "stroke" : "red" } } }

      /*serie3 : {
        color : 'red',
        rounded : false,
        dot : true,
        dotProps : { r : 0, stroke : 'white', 'stroke-width' : 0, opacity : 0 },
        plotProps : { 'stroke-width' : 4, 'stroke-linecap' : 'round', 'stroke-linejoin' : 'round' },
        stacked : true
      }*/
    },
    defaultAxis : {
      labels : true
    },
    axis : {
      x : { labelsRotate: 0, labelsProps : {font: '12px Segoe UI Light' } }
    },
    features : {
      grid : { draw : true, forceBorder: true, ny: 5 }
    },
    barMargins: 10
};

$.elycharts.templates['line_basic_7'] = {
    type : 'line',
    margins : [10, 40, 40, 60],
    defaultSeries : {
      highlight : {
        newProps : { r : 8, opacity : 1 },
        overlayProps : { fill : 'white', opacity : .2 }
      },
      startAnimation : {
      active : true,
      type : 'grow'
    }

    },
    series : {
      serie1 : { color : '#008000', tooltip : {frameProps : { "stroke" : "#008000" } } },
      serie2 : { color : 'red', tooltip : {frameProps : { "stroke" : "red" } } },
	  serie3 : { color : '#4584ed', tooltip : {frameProps : { "stroke" : "#4584ed" } } },
	  serie4 : { color : '#ffa500', tooltip : {frameProps : { "stroke" : "#ffa500" } } },
      /*serie3 : {
        color : 'red',
        rounded : false,
        dot : true,
        dotProps : { r : 0, stroke : 'white', 'stroke-width' : 0, opacity : 0 },
        plotProps : { 'stroke-width' : 4, 'stroke-linecap' : 'round', 'stroke-linejoin' : 'round' },
        stacked : true
      }*/
    },
    defaultAxis : {
      labels : true
    },
    axis : {
      x : { labelsRotate: 0, labelsProps : {font: '12px Segoe UI Light' } }
    },
    features : {
      grid : { draw : true, forceBorder: true, ny: 5 }
    },
    barMargins: 10
};

$.elycharts.templates['pie_basic_1'] = {
  type : 'pie',
  defaultSeries : {
    plotProps : {
      stroke : 'white',
      'stroke-width' : 2,
      opacity : .8
    },
    highlight: {
      move : 20
    },
    tooltip : {
      frameProps : { opacity : .5 }
    },
    label : {
      active : true,
      props : { fill : 'white' }
    },

    startAnimation : {
      active : true,
      type : 'grow'
    }
  },
  features : {
    legend : {
      horizontal : false,
      width: 40,
      height: 80,
      x : 252,
      y : 218,
      borderProps : {
        "fill-opacity" : .3
      }
    }
  }
};

$.elycharts.templates['pie_basic_2'] = {
  type : 'pie',
  style : { 'background-color' : 'black' },
  defaultSeries : {
    plotProps : {
      stroke : 'black',
      'stroke-width' : 2,
      opacity : .6
    },
    highlight: {
      newProps : { opacity : 1 }
    },
    tooltip : {
      frameProps : { opacity : .8 }
    },
    label : {
      active : true,
      props : { fill : 'white' }
    },
    startAnimation : {
      active : true,
      type : 'avg'
    }
  }
};

})(jQuery);
