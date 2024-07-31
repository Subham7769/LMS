import React from 'react'
import ListTable from "../components/Common/ListTable/ListTable";
import { ProjectStats, HeaderList, ProductList } from '../data/ProjectData';
import StatContainer from '../components/Common/StatContainer/StatContainer';


const ProjectPage = () => {
    return (
        <>
            <StatContainer stats={ProjectStats} />
            <ListTable 
            ListName={"Project List"} 
            ListHeader={HeaderList} 
            ListItem={ProductList}
            HandleAction={null}
            Searchable={true}
            Sortable={true} // New prop to enable/disable sorting
            Divider={false}
            />
        </>
    )
}

export default ProjectPage