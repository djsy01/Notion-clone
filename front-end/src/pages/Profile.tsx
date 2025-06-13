import React, { useEffect, useState } from 'react';
import { getProfile } from '../api/auth';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  nickname: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProfile()
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setError('프로필 조회 실패 또는 로그인 필요');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>프로필 정보</h2>
      <p>아이디: {profile?.id}</p>
      <p>사용자명: {profile?.username}</p>
      <p>이메일: {profile?.email}</p>
      <p>닉네임: {profile?.nickname}</p>
    </div>
  );
};

export default Profile;
