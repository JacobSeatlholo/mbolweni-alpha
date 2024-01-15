import React, { FormEvent, useState } from 'react'
import ImageUploader from './ImageUploader'
import { Avatar, Button, Checkbox } from '@nextui-org/react'
import { PencilIcon } from '@/icons/PencilIcon'
import UserProfile from '@/types/UserProfile'
import { useProfile } from './hooks/useProfile'
import AddressInputs from './AddressInputs'

interface ProfileFormProps {
  user: UserProfile | null,
  onSave: (event: FormEvent<HTMLFormElement>, data: UserProfile) => void
}

const ProfileForm = ({ user, onSave }: ProfileFormProps) => {
  const [userName, setUserName] = useState(user?.name || '');
  const [userImage, setUserImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [city, setCity] = useState(user?.city || '');
  const [state, setState] = useState(user?.state || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [country, setCountry] = useState(user?.country || '');
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName: string, value: string): void {
    if (propName === 'phone') setPhone(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'city') setCity(value);
    if (propName === 'state') setState(value);
    if (propName === 'country') setCountry(value);
    if (propName === 'postalCode') setPostalCode(value);
  }

  return (
    <div className='grid grid-cols-6 gap-4'>
      <div className='col-span-2'>
        <ImageUploader
          setImageLink={setUserImage}
          children={
            <div className='relative'>
              {userImage ? (
                <Avatar src={userImage!} className="w-[180px] h-[180px]" />
              ) : (
                <Avatar src='' showFallback className="w-[180px] h-[180px]" />
              )}
              <div className='bg-primary text-white rounded-full p-2 absolute right-7 bottom-6 hover:bg-red-400'>
                <PencilIcon className={'w-5'} />
              </div>
            </div>
          }
        />
      </div>
      <form className='col-span-4' onSubmit={(e) => onSave(e, { name: userName, image: userImage, phone, streetAddress, postalCode, city, state, country, isAdmin })}>
        <label> Full name</label>
        <input type="text" placeholder='Full name' value={userName ?? ''} onChange={e => setUserName(e.target.value)} className='input' />
        <label> Email</label>
        <input type="email" placeholder="Email" value={user?.email ?? ''} disabled className='input' />
        <AddressInputs
          addressProps={{ phone, streetAddress, city, state, country, postalCode }}
          setAddressProps={(propName: string, value: string) => handleAddressChange(propName, value)} disabled={false} />
        {loggedInUserData?.isAdmin && (
          <div className='my-2'>
            <Checkbox checked={isAdmin} defaultSelected={isAdmin} value={'1'} onChange={(e) => setIsAdmin(e.target.checked)}>Admin</Checkbox>
          </div>
        )}
        <Button type='submit' className='mt-2' fullWidth >Save All Changes</Button>
      </form>
    </div>
  )
}

export default ProfileForm