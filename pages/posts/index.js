import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';

export const getStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  return {
    props: { users: data }
  }
}

const Posts = ({users}) => {
  return (
     <Layout>
      <ol>
        {users.map(user => (
          <li className="space-y-0 md:space-y-0 mt-0 border-b border-gray-300 pb-2" key={user.id}>
           <Link href={'/posts/' + user.id} key={user.id}>
             <span className="dark:text-white">{user.name}</span>
           </Link>
          </li>
        ))}
      </ol>

      <div class="mt-10">
        <Link href="/">
           <a className="dark:text-white">Back to the homepage</a>
        </Link>
      </div>

      </Layout>
  )
}

export default Posts;
