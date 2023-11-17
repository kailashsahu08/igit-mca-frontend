import React from 'react'
import BasicModalBackground from './BasicModalBackground'
import CloseIcon from '@mui/icons-material/Close';
import EditGraduation from '../profile/EditGraduation';
import EditFieldOfInterest from '../profile/EditFieldOfInterest';
import EditSocialLinks from '../profile/EditSocialLinks';
import EditProfilePicture from '../profile/EditProfilePicture';

const ProfileEditModal = ({ closeModal, modalType, userDetails }) => {

    const { profilePic, fieldOfInterest } = userDetails;
    const { gradCourse, socialLinks } = userDetails.userDetails;

    return (
        <BasicModalBackground >
            <CloseIcon className='text-white absolute top-2 right-2 cursor-pointer' onClick={closeModal} />
            <div className='border-2 relative p-2 bg-white rounded min-h-min border-white w-[90%] md:w-[50%] max-w-md' >
                <CloseIcon className='absolute top-1 right-1 cursor-pointer' onClick={closeModal} />

                {/* Edit graduation */}
                {modalType === "graduation" && <EditGraduation graduation={gradCourse} />}

                {/* edit field of interest */}
                {modalType === "fieldOfInterest" && <EditFieldOfInterest interest={fieldOfInterest} />}

                {/* edit social links */}
                {modalType === "socialLinks" && <EditSocialLinks socialLinks={socialLinks} />}

                {/* edit profile picture */}
                {modalType === "profilePicture" && <EditProfilePicture profilePic={profilePic} />}
            </div>
        </BasicModalBackground>
    )
}

export default ProfileEditModal