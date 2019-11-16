from splinter import Browser
from bs4 import BeautifulSoup as bs
import time


def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
    executable_path = {"executable_path": "chromedriver.exe"}
    return Browser("chrome", **executable_path, headless=False)


def scrape_info():
    browser = init_browser()

    # Visit website
    url = 'https://mars.nasa.gov/news'
    browser.visit(url)

    time.sleep(1)

    # Scrape page into Soup
    html = browser.html
    soup = bs(html, "html.parser")

    # Get the title and paragraph
    title = soup.find('div', class_='content_title').text
    paragraph = soup.find('div', class_='article_teaser_body').text

    # Close the browser after scraping
    browser.quit()

    # Large Image of Mars
    browser = init_browser()

    # Visit website
    url1 = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    browser.visit(url1)

    time.sleep(1)

    # Navigate to larger images
    browser.click_link_by_partial_text('FULL IMAGE')

    time.sleep(2)

    browser.click_link_by_partial_text('more info')

    time.sleep(2)

    # Scrape page into Soup
    html1 = browser.html
    soup1 = bs(html1, "html.parser")

    # Retrieve element
    image = soup1.find('figure', class_='lede')
    featured_image_url = image.find('a')['href']
    featured_image = "https://www.jpl.nasa.gov" + str(featured_image_url)
    
    browser.quit()

    # Twitter weather
    browser = init_browser()

    # Mars weather twitter
    url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(url)

    time.sleep(2)

    # HTML object
    html = browser.html
    # Parse HTML with Beautiful Soup
    soup = bs(html, 'html.parser')
    # Retrieve element
    weather = soup.find('div', class_='js-tweet-text-container')
    weather_details = weather.find('p', class_='TweetTextSize').text

    browser.quit()

    # Capture Hemispheres titles and links
    browser = init_browser()

    url = 'https://astrogeology.usgs.gov'
    url_plus = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(url_plus)

    # HTML object
    html = browser.html
    # Parse HTML with Beautiful Soup
    soup = bs(html, 'html.parser')
    # Retrieve element
    content = soup.find('div', class_='full-content')
    #content = soup.find_all('div', class_='item')
    h3 = content.find_all('h3')
    href= content.find_all('div', class_='item')

    # Capture the title for later and the link url to open the larger image
    title_pic = []
    link_url = []

    for x in h3:
        title_list = x.text.strip()
        title_pic.append(title_list)
        
    for y in href:
        link = y.find('a')['href']
        link_url.append(url + link)

    browser.quit()

    # Capture hemisphere pictures
    browser = init_browser()

    img_url= []

    for z in link_url:
        browser.visit(z)
        # HTML object
        html = browser.html
        # Parse HTML with Beautiful Soup
        soup = bs(html, 'html.parser')
        # Retrieve all elements
        time.sleep(2)
        browser.click_link_by_partial_text('Open')
        time.sleep(2)
        imagesURL= soup.find('img', class_='wide-image')['src']
        img_url.append(url + imagesURL)
        
    # create a list of dictionaries
    hemisphere_image_urls = []

    for b in title_pic:
        for h in img_url:
            hemisphere_image_urls.append({"pic_title": b, "img_url": h })
            break

    browser.quit()

    # Store data in a dictionary
    news_data = {
        "title": title.strip(),
        "paragraph": paragraph.strip(),
        "imageOne": featured_image.strip(),
        "weather": weather_details,
        "hemispheres": hemisphere_image_urls
    }
 
    # Return results
    return news_data

   