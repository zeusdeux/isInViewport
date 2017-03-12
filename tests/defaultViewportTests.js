function runIsInViewport(tol) {
  $('#container > div.box').css('background-color', '#21221E').text('out of viewport')
  $('#container > div.box:in-viewport(' + tol + ')').css('background-color', '#C5C7BC').text('in viewport')
}

function runIsInViewportWithJqueryNot(tol) {
  $('#container > div.box').not(':in-viewport(' + tol + ')').css('background-color', '#21221E').text('out of viewport')
  $('#container > div.box:in-viewport(' + tol + ')').css('background-color', '#C5C7BC').text('in viewport')
}

function runIsInViewportVariant(tol) {
  $('#container > div.box').css('background-color', '#21221E').text('out of viewport')
  $('#container > div.box').isInViewport({ tolerance: tol }).css('background-color', '#C5C7BC').text('in viewport')
}

var runner = function(runIsInViewportFn, type) {
  describe('isInViewport using ' + type, function() {
    describe('viewport is window', function() {
      var div
      var addContainer = function() {
        var html = '<div id="container"><div class="box">1</div></div>'
        $('body').prepend(html)
        runIsInViewportFn(100)
        div = $('.box')
      }
      var removeContainer = function() {
        $('#container').remove()
      }

      before(addContainer)

      after(removeContainer)

      function top(y, tol) {
        div.css('top', '0')
        div.css('top', y + 'px')
        runIsInViewportFn(tol)
      }

      function left(x, tol) {
        div.css('left', '0')
        div.css('left', x + 'px')
        runIsInViewportFn(tol)
      }

      describe('when tolerance is 100', function() {
        describe('div location vertically in viewport', function() {
          describe('when bottom of div is outside tolerance region while top is inside', function() {
            it('should return the text from div as "in viewport"', function() {
              div.text().should.be.exactly('in viewport')
            })
          })
          describe('when bottom of div is equal to tolerance ie it\'s on the edge of tolerance region', function() {
            it('should return the text from div as "in viewport"', function() {
              top(-100, 100)
              div.text().should.be.exactly('in viewport')
            })
          })
          describe('when bottom of div is inside tolerance region', function() {
            it('should return the text from div as "out of viewport"', function() {
              top(-150, 100)
              div.text().should.be.exactly('out of viewport')
            })
          })
          describe('when top of div is equal to tolerance ie it\'s on the edge of tolerance region', function() {
            it('should return the text from div as "in viewport"', function() {
              top(100, 100)
              div.text().should.be.exactly('in viewport')
            })
          })
          describe('when top of div is outside tolerance region', function() {
            it('should return the text from div as "out of viewport"', function() {
              top(101, 100)
              div.text().should.be.exactly('out of viewport')
            })
          })
        })

        describe('div location horizontally in viewport', function() {
          describe('when left is greater than viewport width', function() {
            it('should return the text from div as "out of viewport"', function() {
              top(0, 100)
              left(99999, 100)
              div.text().should.be.exactly('out of viewport')
            })
          })
          describe('when left is greater than viewport left edge', function() {
            it('should return the text from div as "out of viewport"', function() {
              left(-99999, 100)
              div.text().should.be.exactly('out of viewport')
            })
          })
          describe('when left is lesser than viewport width', function() {
            it('should return the text from div as "in viewport"', function() {
              left(90, 100)
              div.text().should.be.exactly('in viewport')
              left(0, 100)
            })
          })
        })
      })

      describe('when tolerance is 0', function() {
        describe('div location vertically in viewport', function() {
          describe('when div top is 0', function() {
            it('should return the text from div as "in viewport"', function() {
              top(0, 0)
              left(0, 0)
              div.text().should.be.exactly('in viewport')
            })
          })
          describe('when div top < 0 but bottom > 0', function() {
            it('should return the text from div as "in viewport"', function() {
              top(-1, 0)
              div.text().should.be.exactly('in viewport')
            })
          })
          describe('when div bottom < 0', function() {
            it('should return the text from div as "out of viewport"', function() {
              top(-201, 0)
              div.text().should.be.exactly('out of viewport')
            })
          })
          describe('when div top > viewport height', function() {
            it('should return the text from div as "out of viewport"', function() {
              top(99999, 0)
              div.text().should.be.exactly('out of viewport')
            })
          })
          describe('when both divs are in viewport', function() {
            describe('when two arbitrary functions are chained using .do/.run', function() {
              describe('when the first fn changes inner text to done and second adds a class name given by inner text', function() {
                it('should have added a class named "done" to both divs', function() {
                  removeContainer()
                  var html = '<div id="container"><div class="box">1</div><div class="box">2</div></div>'
                  $('body').prepend(html)
                  var divs = $('div.box:in-viewport')
                  var count = 0
                  divs.should.have.length(2, 'length isn\'t 2')
                  divs.run(function() {
                    this.text('done')
                  }).run(function() {
                    // value of this is a normal html node and not a jQuery object
                    // hence it is being converted to a jQuery object here
                    this.addClass(this.text())
                  })
                  $.each(divs, function(i, v) {
                    if ($(v).hasClass('done')) {
                      count++
                    }
                  })
                  count.should.be.exactly(2, 'both divs don\'t have "done" class')
                })
              })
            })
            describe('when values other than functions are passed to .do/.run', function() {
              it('should throw an error', function() {
                var divs = $('div.box:in-viewport')
                divs.should.have.length(2, 'length isn\'t 2')
                try {
                  divs.run('boooop')
                } catch (e) {
                  e.message.should.be.exactly('isInViewport: Argument(s) passed to .do/.run should be a function or an array of functions')
                }
              })
            })
            describe('when array containing mixed values is passed to .do/.run', function() {
              it('should ignore all non-function values and execute the functions that are in the array', function() {
                var divs = $('div.box:in-viewport')
                var temp = 0
                var faultyArray = [1, 'test', function() {
                  return ++temp
                }]
                divs.should.have.length(2, 'length isn\'t 2')
                divs.run(faultyArray)
                temp.should.be.exactly(2, 'The only function in faultyArray didn\'t run') // 2 since there are 2 divs
              })
            })
            describe('when an array of functions is passed to .do/.run', function() {
              it('should execute all of the functions', function() {
                var divs = $('div.box:in-viewport')
                var temp = 0
                var fnArray = []
                var tempFn = function() {
                  return ++temp
                }
                for (var i = 0; i < 4; i++) {
                  fnArray.push(tempFn)
                }
                divs.should.have.length(2, 'length isn\'t 2')
                divs.run(fnArray)
                temp.should.be.exactly(8, 'all four functions did not execute')
              })
            })
          })
        })

        describe('div location horizontally in viewport', function() {
          describe('when left is greater than viewport width', function() {
            it('should return the text from div as "out of viewport"', function() {
              removeContainer()
              addContainer()
              top(0, 0)
              left(99999, 0)
              div.text().should.be.exactly('out of viewport')
            })
          })
          describe('when left is greater than viewport left edge', function() {
            it('should return the text from div as "out of viewport"', function() {
              left(-99999, 0)
              div.text().should.be.exactly('out of viewport')
            })
          })
          describe('when left is lesser than viewport width', function() {
            it('should return the text from div as "in viewport"', function() {
              left(90, 0)
              div.text().should.be.exactly('in viewport')
              left(0, 0)
            })
          })
        })
      })

      describe('when tolerance is -100', function() {
        it('should be window.height - abs(tolerance)', function() {
          var winHt = $(window).height()
          top(winHt - 100, -100)
          div.text().should.be.exactly('in viewport')
        })
      })

      describe('when tolerance is not a number', function() {
        it('should return default tolerance to 0', function() {
          top(0, 'ads')
          left(0, 'ad')
          div.text().should.be.exactly('in viewport')
        })
      })
    })
  })
}

runner(runIsInViewport, 'pseudo-selector')
runner(runIsInViewportVariant, 'exposed isInViewport function')
runner(runIsInViewportWithJqueryNot, 'jquery\'s .not selector')
