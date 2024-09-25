import React from 'react';
import '../recycle-page/styles.css';

const RecyclePage = () => {
  return (
    <div className="container">
      <div className='recycle'>
        <h4 >Recycling 101</h4>
        <p>If you're wondering what is recycling or how to recycle properly, check below to learn everything from recycling basics to expert tips.
        </p>
        <h2>What is Recycling?</h2>
        <p>
        Recycling is the process of converting waste materials into new products. This helps conserve natural resources, reduce pollution, and decrease the amount of waste sent to landfills.
        </p>
        <h2>Why Recycle?</h2>
        <p>
          Conserves Natural Resources: Recycling reduces the need for raw materials, preserving forests, water, and minerals.
          Saves Energy: Producing goods from recycled materials requires less energy than using raw materials.
          Reduces Pollution: Recycling decreases the need for extracting, refining, and processing raw materials, which can create substantial air and water pollution.
          Reduces Landfill Waste: Recycling helps divert waste from landfills, reducing the environmental impact.
        </p>
          <h2>How to Recycle Properly
          </h2>
          <p>
          Know What Can Be Recycled<br></br>
          Keep it clean <br></br>
          Check Local guidelines<br></br>
        </p>
      </div>
      <section >
        <h2>Articles</h2>
        <ul className="article-list">
          <li className="tile">
            <img src='/article1.png' alt="Article 1"/>
            <a href="https://www.earthday.org/7-tips-to-recycle-better/" target="_blank" rel="noopener noreferrer">7 Tips to recycle</a>
            {/* Used w3schools for iframe https://www.w3schools.com/tags/tag_iframe.asp#:~:text=The%20%3Ciframe%3E%20tag%20specifies%20an%20inline%20frame.%20An%20inline%20frame */}
          </li>
          <li className="tile">
            <img src='/article2.png' alt="Article 2"/>
            <a href="https://www.epa.gov/plastics/impacts-plastic-pollution" target="_blank" rel="noopener noreferrer">The Impact of Plastic Waste</a>
          </li>
          <li className="tile">
            <img src='/article3.png' alt="Article 3"/>
            <a href="https://www.greenamerica.org/save-trees/why-recycled-paper" target="_blank" rel="noopener noreferrer">Why Recycled Paper?</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Videos</h2>
        <ul className="video-list">
          <li className="tile">
            <iframe src="https://www.youtube.com/embed/5-2ss07Yi4A" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <h3>Recycling 101</h3>
          </li>
          <li className="tile">
            <iframe src="https://www.youtube.com/embed/-m0YaE8uKcg" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <h3>Big Problems, Small Solutions: A New Perspective</h3>
          </li>
          <li className="tile">
            <iframe src="https://www.youtube.com/embed/GYCamqi9p6Y" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <h3>The Journey of Recycled Plastic!</h3>
          </li>
        </ul>
      </section>
    <section className='recycling-guide'>
      <h4>Recycling Guide</h4>
      <h3>What can be recycled?</h3>
      <form>
        <label for="plasticBottles">
          <input type="checkbox" id="plasticBottles" name="recycling" value="PlasticBottles" /> Plastic Bottles
        </label>
        <label for="beverageContainers">
          <input type="checkbox" id="beverageContainers" name="recycling" value="BeverageContainers" /> Beverage Containers
        </label>
        <label for="cardboardBox">
          <input type="checkbox" id="cardboardBox" name="recycling" value="CardboardBox" /> Cardboard Box
        </label>
        <label for="milkContainers">
          <input type="checkbox" id="milkContainers" name="recycling" value="MilkContainers" /> Milk Containers
        </label>
        <label for="glassBottles">
          <input type="checkbox" id="glassBottles" name="recycling" value="MilkContainers" /> Glass Bottles
        </label>
      </form>
    </section>
      <section>
        <h2>What to Recycle</h2>
        <div>
          <ul className='video-list'>
            <li className="tile">
            <img src='/plastic.png' alt="Article 1"/>
            Recycle plastics by shape: bottles, jars, jugs and tubs. The "chasing arrows" symbol doesn't necessarily mean it's recyclable.
            <h3>Plastic Bottles & Containers</h3>
            </li>
            <li className="tile">
            <img src='/cans.png' alt="Article 1"/>
            Recycle empty tin, aluminum and steel cans.
            <h3>Food & Beverage Cans</h3>
            </li>
            <li className="tile">
            <img src='/paper.png' alt="Article 1"/>
            Paper, newspaper and magazines are good to recycle.
            <h3>Paper</h3>
            </li>
            <li className="tile">
            <img src='/cardboard.png' alt="Article 1"/>
            Flatten and recycle all cardboard and paperboard.
            <h3>Cardboard & Paperboard</h3>
            </li>
            <li className="tile">
            <img src='/milk.png' alt="Article 1"/>
            Rules for recycling milk cartons, juice boxes and food cartons vary by city, county and state. Check local recycling programs for options to recycle cartons.
            <h3>Beverage Containers</h3>
            </li>
            <li className="tile">
            <img src='/glass.png' alt="Article 1"/>
            Glass recycling rules vary, please check your local program guidelines.
            <h3>
            Glass Bottles & Containers</h3>
            </li>

          </ul>
        </div>
      </section>
    </div>
  );
};

export default RecyclePage;
