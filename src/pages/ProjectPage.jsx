import React from 'react'
import Body from '../components/Common/Body/Body'
import ListTable from "../components/Common/ListTable/ListTable";
import { ProjectStats, HeaderList, ProductList } from '../data/ProjectData';
import StatContainer from '../components/Common/StatContainer/StatContainer';


const ProjectPage = () => {
    return (
        <Body>
            <StatContainer stats={ProjectStats} />
            <ListTable 
            ListName={"Project List"} 
            ListHeader={HeaderList} 
            ListItem={ProductList}
            HandleAction={null}
            Searchable={true}
            />
        </Body>
    )
}

export default ProjectPage