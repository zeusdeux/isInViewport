function runHorizontallyScrollingViewport() {
  var visible = ''
  $('li:in-viewport(0, #blocks)').each(function() {
    visible += $(this).text() + ' '
  })
  return visible.trim()
}

function runHorizontallyScrollingViewportVariant() {
  var visible = ''
  $('li').isInViewport({ tolerance: 0, viewport: $('#blocks') }).each(function() {
    visible += $(this).text() + ' '
  })
  return visible.trim()
}


var runner = function(runViewportFn, type) {
  describe('isInViewport using ' + type, function() {
    describe('viewport is a horizonatlly scrollable list (ul#blocks)', function() {
      var buidList = function() {
        $('body').append('<ul id="blocks"></ul>')

        // Add 10 list items to the list
        for (var i = 1; i <= 10; i++) {
          $('#blocks').append('<li>' + i + '</li>')
        }
      }
      var removeList = function() {
        $('#blocks').remove()
      }
      var scrollLeft = function(px) {
        px = px || $('#blocks')[0].scrollWidth
        $('#blocks').scrollLeft(px)
      }

      before(buidList)
      after(removeList)

      describe('when the first four items are visible', function() {
        it('should return the string "1 2 3 4" as a list of currently visible items', function() {
          runViewportFn().should.be.exactly('1 2 3 4')
        })
      })
      describe('when we scroll the list left by 525px', function() {
        it('should return the string "4 5 6 7 8" as a list of currently visible items', function() {
          scrollLeft(525)
          runViewportFn().should.be.exactly('4 5 6 7 8')
        })
      })
      describe('when we scroll the list to the end', function() {
        it('should return the string "7 8 9 10" as a list of currently visible items', function() {
          scrollLeft()
          runViewportFn().should.be.exactly('7 8 9 10')
        })
      })
    })
  })
}

runner(runHorizontallyScrollingViewport, 'pseudo-selector')
runner(runHorizontallyScrollingViewportVariant, 'exposed isInViewport function')
