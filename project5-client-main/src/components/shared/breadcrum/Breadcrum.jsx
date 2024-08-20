import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ breadcrumbs }) {
  return (
    <>
      <div className='chawkbazarBreadcrumb flex items-center'>
        <ol className='flex items-center w-full overflow-hidden'>
          <li className='text-sm text-body px-2.5 transition duration-200 ease-in first:ps-0 last:pe-0 hover:text-heading font-semibold'>
            <Link to='/'>Artemis</Link>
          </li>
          {breadcrumbs &&
            breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <li className='text-base text-body mt-0.5'>/</li>
                <li
                  className={
                    'text-sm text-body px-2.5 transition duration-200 ease-in first:ps-0 last:pe-0 hover:text-heading ' +
                    (item.link && 'font-semibold')
                  }
                >
                  {item.link ? (
                    <Link className='capitalize' to={item.link}>
                      {item.name}
                    </Link>
                  ) : (
                    <div className='capitalize'>{item.name}</div>
                  )}
                </li>
              </React.Fragment>
            ))}
        </ol>
      </div>
    </>
  );
}
