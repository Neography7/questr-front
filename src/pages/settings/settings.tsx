import { FormEvent, useEffect, useState } from 'react';
import {
    Button,
    TextInput,
    Alert,
    Textarea,
    Avatar
} from 'flowbite-react';
import { FaUser, FaEnvelope, FaLock, FaCircleInfo } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { gql, useMutation, useQuery } from '@apollo/client';
import { setAvatar, setInformation } from '../../app/slices/auth';
import { useDispatch } from 'react-redux';
import Helmet from '../../components/helmet';

export default function Settings () {

    const { t } = useTranslation();  
    
    const [avatarPreview, setAvatarPreview] = useState('');
    const [avatarBase64, setAvatarBase64] = useState('');
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const [uploadAvatarError, setUploadAvatarError] = useState(false);
    const [uploadAvatarCallback, setUploadAvatarCallback] = useState('');
    const [changeInformationError, setChangeInformationError] = useState(false);
    const [changeInformationCallback, setChangeInformationCallback] = useState('');
    const [changePasswordError, setChangePasswordError] = useState(false);
    const [changePasswordCallback, setChangePasswordCallback] = useState('');

    const dispatch = useDispatch();

    const GET_INFORMATION = gql`
        query GetInformation {
            getInformation {
                id
                username
                nickname
                email
                bio
                avatar
            }
        }
    `;

    const { data, loading, error } = useQuery(GET_INFORMATION);
    
    if (error) {
        console.log(error);
    }

    useEffect(() => {
        if (data && data.getInformation) {
            const information = data.getInformation;

            setUsername(information.username);
            setNickname(information.nickname);
            setEmail(information.email);
            setBio(information.bio);
            setAvatarPreview(information.avatar);
            
        }
    }, [data]);

    // AVATAR
    const handleImageChange = (e: any): void => {

        if (!e?.target?.files.length)
            return;

        const selectedFile = e.target.files[0]; 
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const image = new Image();
                image.src = event?.target?.result as string;
    
                image.onload = () => {
                    const maxWidth = 300;
                    const maxHeight = 300;
    
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
    
                    let width = image.width;
                    let height = image.height;
    
                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }
    
                    canvas.width = width;
                    canvas.height = height;
    
                    context?.drawImage(image, 0, 0, width, height);
    
                    const dataUrl: string = canvas.toDataURL('image/jpeg'); // Resmi base64 formatına dönüştürme
    
                    setAvatarPreview(dataUrl);
                    setAvatarBase64(dataUrl);

                };
            };
            reader.readAsDataURL(selectedFile); 
        }
    };

    const UPDATE_AVATAR = gql`  
        mutation UploadAvatar($avatarBase64: String!) {
            uploadAvatar(avatarBase64: $avatarBase64) {
                error
                message
                avatar
            }
        }        
    `;

    const [executeAvatarUpload, avatarResponse] = useMutation(UPDATE_AVATAR);

    const updateAvatar = async () => {

        setSubmitButtonDisabled(true);
        setUploadAvatarError(false);
        setUploadAvatarCallback('');

        if (!avatarBase64) {
            setSubmitButtonDisabled(false);
            setUploadAvatarError(true);
            setUploadAvatarCallback(t('settings_page.please_upload_an_avatar'));
            return false;
        }

        try {

            const { data } = await executeAvatarUpload({
                variables: { avatarBase64 }, 
                mutation: UPDATE_AVATAR 
            });

            dispatch(setAvatar(data.uploadAvatar.avatar))
            setAvatarPreview(data.uploadAvatar.avatar)

            setSubmitButtonDisabled(false);
            setUploadAvatarError(false);
            setUploadAvatarCallback(t('general.is_changed', { "attribute": "settings_page.your_avatar" }))

          } catch (err) {

            setSubmitButtonDisabled(false);
            setUploadAvatarError(true);
            setUploadAvatarCallback(( avatarResponse?.error?.graphQLErrors[0]["message"] ?? 'System error' ));

            throw err;
        }

    }

    // INFORMATION
    const UPDATE_INFORMATION = gql`  
        mutation ChangeInformation($username: String!, $nickname: String!, $email: String!, $bio: String) {
            changeInformation(username: $username, nickname: $nickname, email: $email, bio: $bio) {
                username
                nickname
                email
                bio
            }
        }        
    `;

    const [executeChangeInformation, changeInformationResponse] = useMutation(UPDATE_INFORMATION);

    const changeInformation = async (event: FormEvent) => {

        event.preventDefault();

        setSubmitButtonDisabled(true);
        setChangeInformationError(false);
        setChangeInformationCallback('');

        if (username.length === 0 || email.length === 0 ) {
            setSubmitButtonDisabled(false);
            setChangeInformationError(true);
            if (!username.length)
                setChangeInformationCallback(t('validation.cannot_be_blank', { "attribute": "general.username" }));
            if (!email.length)
                setChangeInformationCallback(t('validation.cannot_be_blank', { "attribute": "general.email" }));
            return;
        }

        try {

            await executeChangeInformation({
                variables: { 
                    username,
                    nickname,
                    email,
                    bio
                }, 
                mutation: UPDATE_INFORMATION 
            });

            dispatch(setInformation({ 
                username,
                nickname,
                email
            }))

            setSubmitButtonDisabled(false);
            setChangeInformationError(false);
            setChangeInformationCallback(t('general.is_updated', { "attribute": "settings_page.your_information" }))

          } catch (err) {

            setSubmitButtonDisabled(false);
            setChangeInformationError(true);
            setChangeInformationCallback(( changeInformationResponse?.error?.graphQLErrors[0]["message"] ?? 'System error' ));

            throw err;
        }

    }

    // PASSWORD
    const UPDATE_PASSWORD = gql`  
        mutation ChangePassword($oldPassword: String!, $newPassword: String!, $newPasswordConfirmation: String!) {
            changePassword(oldPassword: $oldPassword, newPassword: $newPassword, newPasswordConfirmation: $newPasswordConfirmation) {
                error
                message
            }
        }        
    `;

    const [executeChangePassword, changePasswordResponse] = useMutation(UPDATE_PASSWORD);

    const changePassword = async (event: FormEvent) => {

        event.preventDefault();

        setSubmitButtonDisabled(true);
        setChangePasswordError(false);
        setChangePasswordCallback('');

        if (oldPassword.length === 0 || newPassword.length === 0 || newPasswordConfirmation.length === 0 || oldPassword === newPassword || newPassword !== newPasswordConfirmation) {
            setSubmitButtonDisabled(false);
            setChangePasswordError(true);
            if (!oldPassword.length)
                setChangePasswordCallback(t('validation.cannot_be_blank', { "attribute": "settings_page.old_password" }));
            else if (!newPassword.length)
                setChangePasswordCallback(t('validation.cannot_be_blank', { "attribute": "settings_page.new_password" }));
            else if (!newPasswordConfirmation.length)
                setChangePasswordCallback(t('validation.cannot_be_blank', { "attribute": "settings_page.new_password_confirmation" }));
            else if (oldPassword === newPassword)
                setChangePasswordCallback(t('validation.cannot_be_same', { "attribute": "settings_page.old_password", "and": "settings_page.new_password" }));
            else if (newPassword !== newPasswordConfirmation)
                setChangePasswordCallback(t('validation.must_be_same', { "attribute": "settings_page.old_password", "and": "settings_page.new_password" }));
            return;
        }

        try {

            await executeChangePassword({
                variables: { 
                    oldPassword,
                    newPassword,
                    newPasswordConfirmation
                }, 
                mutation: UPDATE_PASSWORD 
            });

            setOldPassword('');
            setNewPassword('');
            setNewPasswordConfirmation('');
            setSubmitButtonDisabled(false);
            setChangePasswordError(false);
            setChangePasswordCallback(t('general.is_changed', { "attribute": "settings_page.your_password" }))

          } catch (err) {

            setSubmitButtonDisabled(false);
            setChangePasswordError(true);
            setChangePasswordCallback(( changePasswordResponse?.error?.graphQLErrors[0]["message"] ?? 'System error' ));

            throw err;
        }

    }

    return (
        <>
            <Helmet title={ t('settings_page.user_settings') } />

            { !loading ?
                <section className=''>
                    <div className="pt-8 px-6 mx-auto max-w-screen-xl lg:pt-16 lg:px-2">
                        <div className="mx-auto max-w-screen-sm lg:mb-16 mb-8">

                            <h2 className="text-2xl lg:text-4xl font-extrabold dark:text-white">{ t('settings_page.user_settings') }</h2>
                            <p className="my-4 text-lg text-gray-500">{ t('settings_page.sub_title') }</p>

                            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-6">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <div className='flex items-center'>
                                        <div className='w-36 mr-5'>
                                            <Avatar img={() => (
                                                avatarPreview ? <img
                                                    alt="Avatar"
                                                    referrerPolicy="no-referrer"
                                                    src={avatarPreview}
                                                    className="w-36 h-36 object-cover rounded-full border-"
                                                /> : 
                                                <div className="relative w-36 h-36 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                                    <div className="absolute inset-0 flex items-center justify-center w-full h-full">
                                                        <svg className="absolute w-44 h-44 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                                    </div>
                                                </div>
                                            )} className='w-36' />
                                        </div>
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 block md:hidden"><span className="font-semibold">{ t("settings_page.click_to_upload_avatar")}</span></p>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 hidden md:block"><span className="font-semibold">{ t("settings_page.click_to_upload")}</span> { t("settings_page.or_drag_and_drop")}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">PNG / JPG</p>
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" onChange={(event) => handleImageChange(event)} />
                                            </label>
                                        </div>
                                    </div>
                                    { uploadAvatarCallback && 
                                        <Alert color={ uploadAvatarError ? 'failure' : 'success'} icon={FaCircleInfo}> 
                                            <span>
                                                <p>
                                                    <span className="font-medium mr-1">
                                                        { uploadAvatarError && t('general.warning') + "!" }
                                                    </span>
                                                    { uploadAvatarCallback }
                                                </p>
                                            </span>
                                        </Alert>
                                    }
                                    <Button color="blue" className="w-full" disabled={submitButtonDisabled} onClick={() => updateAvatar() }>{ t('settings_page.update_avatar') }</Button>
                                </div>
                            </div> 

                            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-6">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <form onSubmit={(event) => changeInformation(event)} className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ t("general.username") }</label>
                                            <TextInput icon={FaUser} id="username" placeholder={ t('general.username') } required value={username} onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor="nickname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ t("general.nickname") }</label>
                                            <TextInput icon={FaUser} id="nickname" placeholder={ t('general.nickname') } required value={nickname} onChange={(e) => setNickname(e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ t("general.email") }</label>
                                            <TextInput icon={FaEnvelope} id="email" placeholder={ t('general.email') } required type="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
                                        </div>
                                        <div>
                                            <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ t("settings_page.your_biography") }</label>
                                            <Textarea id="bio" placeholder={ t("settings_page.your_biography") } rows={4} value={bio} onChange={(e) => setBio(e.target.value)}  />
                                        </div>
                                        { changeInformationCallback && 
                                            <Alert color={ changeInformationError ? 'failure' : 'success'} icon={FaCircleInfo}> 
                                                <span>
                                                    <p>
                                                        <span className="font-medium mr-1">
                                                            { changeInformationError && t('general.warning') + "!" }
                                                        </span>
                                                        { changeInformationCallback }
                                                    </p>
                                                </span>
                                            </Alert>
                                        }
                                        <Button color="blue" type="submit" className="w-full" disabled={submitButtonDisabled}>{ t('settings_page.update_profile_information') }</Button>
                                    </form>
                                </div>
                            </div> 

                            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <form onSubmit={(event) => changePassword(event)} className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label htmlFor="old_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ t("settings_page.old_password") }</label>
                                            <TextInput icon={FaLock} id="old_password" type="password" placeholder={ t('settings_page.old_password') } required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor="new_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ t("settings_page.new_password") }</label>
                                            <TextInput icon={FaLock} id="new_password" type="password" placeholder={ t('settings_page.new_password') } required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                        </div>
                                        <div>
                                            <label htmlFor="new_password_confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ t("settings_page.new_password_confirmation") }</label>
                                            <TextInput icon={FaLock} id="new_password_confirmation" type="password" placeholder={ t('settings_page.new_password_confirmation') } required value={newPasswordConfirmation} onChange={(e) => setNewPasswordConfirmation(e.target.value)} />
                                        </div>
                                        { changePasswordCallback && 
                                            <Alert color={ changePasswordError ? 'failure' : 'success'} icon={FaCircleInfo}> 
                                                <span>
                                                    <p>
                                                        <span className="font-medium mr-1">
                                                            { changePasswordError && t('general.warning') + "!" }
                                                        </span>
                                                        { changePasswordCallback }
                                                    </p>
                                                </span>
                                            </Alert>
                                        }
                                        <Button color="blue" type="submit" className="w-full" disabled={submitButtonDisabled}>{ t('settings_page.change_password') }</Button>
                                    </form>
                                </div>
                            </div> 

                        </div> 
                    </div> 
                </section>
                : ''
            }
        </>
    );

}