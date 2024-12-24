
# AppLayout

### Description
`AppLayout` is a React component designed to serve as the main layout for the application. This component is responsible for rendering the header, footer, sidebar, and the main content area with dynamic adjustments to the layout based on the height of the navbar and the width of the sidebar.

### Purpose
The primary purpose of `AppLayout` is to provide a consistent and responsive layout for the application. It aims to ensure that the main content area is properly adjusted and displayed based on the dimensions of the navbar and sidebar, enhancing the overall user experience.

### Features
- Dynamically adjusts the height of the main content area based on the navbar height.
- Dynamically adjusts the width of the main content area based on the sidebar width.
- Integrates with the React Router's `Outlet` component to render nested routes.
- Includes a header, footer, and sidebar as part of the layout.

### Usage
To use the `AppLayout` component, follow the example below:

```jsx
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../Sidebar";

const AppLayout = () => {
    const [navBarHeight, setNavBarHeight] = useState(0);
    const [SideBarWidth, setSideBarWidth] = useState(0);
  
    useEffect(() => {
      const SideBarElement = document.getElementById("SideBarId");
      const navbarElement = document.getElementById("navBarId");
      setNavBarHeight(navbarElement.offsetHeight + 20);
  
      const resizeObserver = new ResizeObserver((entries) => {
        const newWidth = entries[0].contentRect.width;
        setSideBarWidth(newWidth + 50); // Update state with padding
      });
  
      resizeObserver.observe(SideBarElement);
  
      return () => resizeObserver.disconnect(); // Cleanup on unmount
    }, []);
  
    return (
      <div className="flex max-w-full overflow-x-hidden">
        <SideBar />
        <div className="flex grow flex-col min-h-screen">
          <Header />
          <div
            className="mr-4"
            style={{
              marginTop: `${navBarHeight}px`,
              marginLeft: `${SideBarWidth}px`,
            }}
          >
            <Outlet />
          </div>
          <Footer mgLeft={SideBarWidth} />
        </div>
      </div>
    );
  };

  export default AppLayout;
```

### Props
The `AppLayout` component does not accept any props.

### Example
Here is a more detailed example of how to implement `AppLayout`:

```jsx
import React from 'react';
import AppLayout from './Components/AppLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function ExampleComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="home" element={<HomeComponent />} />
          <Route path="about" element={<AboutComponent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default ExampleComponent;
```

### Additional Notes
- Ensure that the `Header`, `Footer`, and `SideBar` components have the appropriate IDs (`navBarId` and `SideBarId`) for the resizing logic to work correctly.
- The layout adjusts automatically when the sidebar is resized or when the navbar height changes, providing a responsive user experience.

---
