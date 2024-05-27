<h1>3D Boat Configurator</h1>
<h3>Intro</h3>
<p>In this 3D product configurator, you can customize a wooden sailboat and calculate the configuration.<br>
It is written in React as a multipage application. <a href="https://docs.pmnd.rs/react-three-fiber/getting-started/introduction">R3F</a> is used to handle and display the 3D objects.</p>
<h3>Structure:</h3>
<p>The main features can be found on the "Configurator" and "Checkout" pages, while "Home" and "About" serve as placeholder pages.</p>
<h4>Configurator:</h4>
<img src="https://github.com/Beattraceur/3d-Boat-Configurator/assets/133157674/2e65c262-e67a-4402-a425-d3796d58f332" alt="3d config menu" width="500">
<p>Entering the Configurator page, you see a small 3D sailboat floating on the ocean.<br>
On the left, the total cost of the current setup is displayed, as well as a button to reset the configuration.<br>
The middle section houses three tabs with sub-configuration menus.<br>
To the right, the checkout button is located beside a screenshot camera icon and next to a "share config link" tab.</p>
<h4>The Configurator Menu</h4>
<img src="https://github.com/Beattraceur/3d-Boat-Configurator/assets/133157674/18cc95e2-fb50-4b92-834b-63f3a0e33ffb" alt="3d config menu" width="500">
<p>Divided into three sub-menus, every customization option with its costs can be found.<br>
Once an option is selected, the total cost will update as well as the 3D sailboat model.<br>
Every option can also be deselected with an additional click.<br>
The whole menu is generated based on the price and productConfig JSONs stored in the data folder.<br>
New tabs, for example, can be generated simply by extending these JSON files.<br>
To simulate the fetching process, these JSONs are loaded in the DataLoader.jsx component with a one-second delay.<br>
A solution to compensate for this delay with prefetching can be found in Home.jsx.</p>
<h4>Local Storage Usage:</h4>
<p>Every time a change of the configuration is made, an updated version is saved in the browser's local storage.</p>
<h4>Sharing Options:</h4>
<p>The "share config link" tab will generate a URL that holds the actual configuration and saves it to the client's clipboard.<br>
Opening a URL with config parameters will override not only the recent configuration but also the local storage config.<br>
The photo icon will trigger a screenshot download of the current view without overlay elements.</p>
<img src="https://github.com/Beattraceur/3d-Boat-Configurator/assets/133157674/07be3d4a-4cdf-43cf-8c9b-a959fe68536f" alt="high quality 3d capture" width="500">
<h4>The Checkout:</h4>
<img src="https://github.com/Beattraceur/3d-Boat-Configurator/assets/133157674/016fd3ce-4a1b-4e31-98f7-5476ecf4c15c" alt="checkout page" width="500">
<p>Happy with your sailboat's configuration? You can navigate to the checkout page by using the checkout button to the right or the tab at the top.<br>
The Checkout page contains three product shots from different perspectives.<br>
These shots are captured every time the configuration changes and saved as a blob array inside a React context.<br>
Note that these shots can only be generated on the Configurator page.<br>
Therefore, the product images can be missing when navigating directly to checkout, skipping the 3D stage.<br>
Beneath the picture array, a table with the calculation of the current setup is displayed.<br>
This calculation is made based on the config React context that is available throughout the whole application.</p>
