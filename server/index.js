const express = require('express')
const { faker } = require('@faker-js/faker')
const cors = require('cors');

const app = express()
const port = 3001

app.use(cors());

const createRandomBrand = () => ({
  id: faker.datatype.uuid(),
  name: faker.company.name(),
  logo: faker.image.business(300, 300, true),
  campaigns: [],
});

const createRandomUser = () => ({
  id: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  birthdate: faker.date.birthdate(),
  country: faker.address.country(),
})

const createRandomCampaign = () => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  coverImage: faker.image.food(640, 480, true),
  brandId: '',
  influencers: [],
});

const createDB = () => {
  const brands = new Array(10).fill(null).map(() => createRandomBrand()); 
  const campaigns = new Array(50).fill(null).map(() => createRandomCampaign()); 
  const influencers = new Array(100).fill(null).map(() => createRandomUser());

  // attach brands and influencers to campaigns
  for (let c = 0; c < campaigns.length; c++) {
    const brandIdx = Math.floor(Math.random(brands.length - 1) * 10);
    campaigns[c].brandId = brands[brandIdx].id

    brands.map(brand => {
      if (brand.id === campaigns[c].brandId) {
        brand.campaigns.push({
        id: campaigns[c].id,
        name: campaigns[c].name,
        coverImage: campaigns[c].coverImage,
      }); 
      }
    })

    const randomUniqueUsers = influencers.filter(() => {
      const random = Math.floor(Math.random(influencers.length) * 1000);
       return random < influencers.length
    });
    
    campaigns[c].influencers = randomUniqueUsers.map(item => ({
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      avatar: item.avatar,
    }));
  }

  return {brands, campaigns, influencers};
}

// create DB
const DB = createDB();


// GET
app.get('/all', (req, res) => {
  res.json(DB)
})

app.param('brandId', (req, res, next, brandId) => {
  const result = DB.brands.find(item => item.id === brandId);
  if (result) {
    res.json(result)
  } else {
    res.json();
  }
})

app.param('campaignId', (req, res, next, campaignId) => {
  const result = DB.campaigns.find(item => item.id === campaignId);
  if (result) {
    res.json(result)
  } else {
    res.json();
  }
})

app.param('influencerId', (req, res, next, influencerId) => {
  const influencer = DB.influencers.find(item => item.id === influencerId);
  const campaigns = DB.campaigns.filter(campaign => campaign.influencers.find(influencer => influencer.id === influencerId));
  const campaignsSanitized = campaigns.map(campaign => ({
    id: campaign.id,
    name: campaign.name,
    coverImage: campaign.coverImage,
  }))

  const result = {
    ...influencer,
    campaigns: campaignsSanitized,
  }

  if (influencer) {
    res.json(result);
  } else {
    res.json();
  }
})

app.get('/brands', (req, res) => {
  res.json(DB.brands)
})

app.get('/campaigns', (req, res) => {
  res.json(DB.campaigns)
})

app.get('/influencers', (req, res) => {
  res.json(DB.influencers)
})

app.get('/brands/:brandId', (req, res) => {
  res.send()
})

app.get('/campaigns/:campaignId', (req, res) => {
  res.send()
})

app.get('/influencers/:influencerId', (req, res) => {
  res.send()
})

app.get('/', (req, res) => {
  const body = `
    <html>
    <body style="font-family: sans-serif;">
      <h1>Hi There!</h1>
      <p>
        <h2>Here's your endpoints:</h2>
      </p>
      <p>
        <h3>
          <ul>
            <p>
              <li>
                <span>/brands</span>
                <span><ul><li>/brands/:id</li></ul></span>
              </li>
            </p>
            <p>
              <li>
                <span>/campaigns</span>
                <span><ul><li>/campaigns/:id</li></ul></span>
              </li>
            </p>
            <p>
            <li>
              <span>/influencers</span>
              <span><ul><li>/influencers/:id</li></ul></span>
            </li>
            </p>
          </ul>
        </h3>
      </p>
    </body>
    </html>
  `
  res.send(body);
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})