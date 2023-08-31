import { Link, useLocation } from 'react-router-dom';
import { CategoryType } from '../../../pages/catalog/CatalogPage';
import { createStyles } from '@mantine/core';

const breadCrumbsStyles = createStyles(() => ({
  links: {
    display: 'flex',
    gap: '10px',
    paddingBottom: '10px',
  },

  link: {
    position: 'relative',
    fontSize: '20px',

    '&:last-child': {
      cursor: 'default',
    },

    '&:not(:last-child)::after': {
      content: '">"',
      marginLeft: '10px',
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      display: 'block',
      width: '0%',
      height: '3px',
      bottom: '0',
      backgroundColor: 'black',
      transition: 'width .5s ease 0s',
    },

    '&:hover:not(:last-child)::before': {
      width: 'calc(100% - 18px)',
    },
  },
}));

const BreadCrumbs = ({ allCategories }: { allCategories: CategoryType[] }) => {
  const location = useLocation();
  const { classes } = breadCrumbsStyles();
  let currentLink = '';

  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <Link key={crumb} className={classes.link} to={currentLink}>
          {allCategories.find((item) => item.id === crumb)?.name || 'Catalog'}
        </Link>
      );
    });

  return <div className={classes.links}>{crumbs}</div>;
};

export default BreadCrumbs;
