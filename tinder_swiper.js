var maxDistance = 43
var minAge = 20
var autolike = false // Pause on profiles matching above params, or always swipe right
var minSwipeSecs = 1 // Minimum secs to wait between swipes (to not seem like a bot)
var maxSwipeSecsVariance = 2 // Max amount of random seconds to wait between swipes, so interval is not always the same and to seem like less of a bot :)

async function swipeLeft() {
  //Can adjust the line below to increase/decrease the swiping speed
  var timeBetweenSwipe = Math.random() * (maxSwipeSecsVariance * 1000) + (minSwipeSecs * 1000);
  
  var profileButton = document.evaluate("//*[text()='Open Profile']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

  if (profileButton === null)
    return
  profileButton.parentNode.parentNode.click()

  await new Promise(r => setTimeout(r, 500));

  var distanceDiv = document.evaluate("//div[contains(text(),'kilometers away')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

  var ageSpan = document.evaluate("//*[@itemprop='age']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

  if (distanceDiv == null || distanceDiv.innerText.match(/\d+/)[0] > maxDistance || (ageSpan !== null && ageSpan.innerText.match(/\d+/)[0] < minAge)) {
    console.log('Nope!')
    document.evaluate("//*[text()='Nope']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentNode.parentNode.click();
    setTimeout(swipeLeft, timeBetweenSwipe);
  } else if (autolike === true) {
    console.log('Like!')
    document.evaluate("//*[text()='Like']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentNode.parentNode.click();
    setTimeout(swipeLeft, timeBetweenSwipe);
  } else {
    setTimeout(swipeLeft, 3000)
  }
}

swipeLeft();
