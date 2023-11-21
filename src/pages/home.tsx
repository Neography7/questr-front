import { Trans, useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import Question from '../components/question';
import { FaEllipsis, FaGhost, FaXTwitter, FaWhatsapp, FaSquareFacebook } from 'react-icons/fa6';
import { Button, Spinner } from 'flowbite-react';
import { getQuestions } from '../app/slices/unanswereds';
import Helmet from '../components/helmet';
import Loading from '../components/loading';
import { AppDispatch } from '../app/store';

function Home() {

  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const unanswereds = useSelector((state: any) => state.unanswereds);
  const auth = useSelector((state: any) => state.auth);

  const loadQuestions = () => {
    dispatch(getQuestions());
  }

  // share
  const shareUrl = `${window.location.origin}/profile/${auth.user.username}`
  const shareText = "✒️❓ " + t('share.ask_something_about_me') + "\n\n"

  const shareOnTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(twitterShareUrl);
  }

  const shareOnWhatsapp = () => {
    const whatsappShareUrl = `whatsapp://send?text=${encodeURIComponent(shareText)}\n\n${encodeURIComponent(shareUrl)}`;
    window.open(whatsappShareUrl);
  }

  const shareOnFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookShareUrl);
  }

  return (
    <>            
      <Helmet title={ unanswereds?.count > 0 ? t('home.you_have_unanswered_questions_formatted', { count: unanswereds.count }) : t('home.home') } />

      { !unanswereds.pending ?
        <section>
          <div className="pt-8 px-4 mx-auto max-w-screen-xl lg:pt-16 lg:px-6">

            { unanswereds.count > 0 ?
              <div className='mx-auto max-w-screen-sm lg:mb-16 mb-8'>
                <div className="text-center mb-16">
                  <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    <Trans
                      i18nKey="home.you_have_unanswered_questions"
                      count={unanswereds.count}
                      components={{
                        1: <mark className="px-3 text-white bg-blue-600 rounded dark:bg-blue-500" />,
                      }}
                    />
                  </h1>
                  <h2 className='text-2xl md:text-3xl lg:text-4xl spacing-2 dark:text-white'>{ t('home.answer_to_satisfy_curiosities') } </h2>
                </div>
                <div className="w-100">
                      
                  <div>
                    { unanswereds.questions.map((question: any) => (
                      <Question key={question._id} data={question} className="mb-4" /> 
                    )) }
                  </div>
                    
                  { (unanswereds.totalPage > unanswereds.page) &&
                    <div className='flex flex-col align-middle items-center mt-5'>
                      { !unanswereds.pending && <Button onClick={() => loadQuestions()} className='h-12 w-12 rounded-full'><FaEllipsis /></Button> }
                      { unanswereds.pending && <Button className='h-12 w-12 rounded-full'><Spinner aria-label="Page Loading" /></Button> }
                    </div>
                  }

                </div> 
              </div> :
              <div className='mx-auto max-w-screen-sm lg:mb-16 mb-8'>
                <div className="text-center mb-8">
                  <span className='text-8xl pt-8 pb-16 flex justify-center text-blue-500 text-opacity-80'>
                      <FaGhost />
                  </span>
                  <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    { t("home.there_is_not_a_soul_around") }
                  </h1>
                  <h2 className='text-2xl spacing-2 dark:text-white'>{ t("home.it_seems_there_is_currently_no_question_asked_to_you") }</h2>
                </div>
                <div className="w-100 flex justify-center">
                  <div className="grid grid-cols-12">
                    <div className="col-span-12 md:col-span-4 p-4 flex items-center">
                      <button onClick={ () => shareOnTwitter() } className='flex flex-col items-center justify-center px-6 py-4 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none w-[170px] h-[140px]'>
                        <span className='mt-2 mb-6'><FaXTwitter className="text-2xl" /></span>
                        <span>{ t("general.share_on", { site: "X"}) }</span>
                      </button>
                    </div>
                    <div className="col-span-12 md:col-span-4 p-4 flex items-center">
                      <button onClick={ () => shareOnWhatsapp() } className='flex flex-col items-center justify-center px-6 py-4 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none w-[170px] h-[140px]'>
                        <span className='mt-2 mb-4'><FaWhatsapp className="text-2xl" /></span>
                        <span>{ t("general.share_on", { site: "Whatsapp"}) }</span>
                      </button>
                    </div>
                    <div className="col-span-12 md:col-span-4 p-4 flex items-center">
                      <button onClick={ () => shareOnFacebook() } className='flex flex-col items-center justify-center px-6 py-4 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none w-[170px] h-[140px]'>
                        <span className='mt-2 mb-4'><FaSquareFacebook className="text-2xl" /></span>
                        <span>{ t("general.share_on", { site: "Facebook"}) }</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </section>
      : 
      <Loading />
      }
    </>
  )
}

export default Home
