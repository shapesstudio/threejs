import Link from 'next/link';
import Image from 'next/image';

import { getDate } from '../utils/utils';

export default function Post({ post, featuredMedia }) {
    return (

      <div className="bg-white lg:w-2/3 mx-auto p-2 p-8 sm:p-4 sm:h-auto rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none mb-5 sm:mb-8 dark:bg-gray-800">
          <div className="h-52 sm:h-auto sm:w-72 rounded-xl relative">
            <Image
              src={featuredMedia['media_details'].sizes.large['source_url']}
              layout="fill"
              className="object-cover rounded-lg overflow-hidden"
              alt={featuredMedia['alt_text']}
            />
          </div>
          <div className="flex flex-col flex-1 gap-8 sm:p-2 text-left">
              <div className="flex flex-1 flex-col gap-3">
                <div class="flex gap-3">
                  <div className="w-8/12 h-14 rounded-2xl">
                    <h5 className="text-indigo-500 text-lg font-light">Case</h5>
                    <h2 className="text-gray-800 dark:text-white text-xl font-bold mb-2">{post.title.rendered}</h2>
                  </div>
                  <div className="w-auto h-8 rounded-full mt-3">
                    <div className="text-xs p-4 py-2 text-gray-600 border border-indigo-600 rounded dark:border-gray-400 dark:text-gray-400">{post.acf.company}</div>
                  </div>
                </div>

                  <div className="w-full h-auto rounded-2xl">
                    <p className="text-gray-400 dark:text-gray-300 font-light text-base">
                      <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                    </p>
                  </div>
              </div>

              <div className="mt-auto flex gap-3">
                  <div className="w-8/12 h-8 -mt-3 rounded-full">
                    <Link href={`/cases/${post.slug}`}>
                    <a>
                      <button type="button" className="px-4 py-2 text-base rounded-lg text-white bg-indigo-500 hover:bg-indigo-700 ">
                        Read more..
                      </button>
                    </a>
                    </Link>
                  </div>
                  <div className="w-4/12 h-8 ounded-full ml-auto">
                    <p className="text-gray-400 dark:text-gray-300 text-xs py-1.5 px-4">On {getDate(post.modified)}</p>
                  </div>


              </div>
          </div>
      </div>

  );
}
