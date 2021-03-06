PGDMP                         z            exchange_db    13.2    13.2     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    134018    exchange_db    DATABASE     V   CREATE DATABASE exchange_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
    DROP DATABASE exchange_db;
                postgres    false            ?            1259    134204    transizione    TABLE       CREATE TABLE public.transizione (
    id_transizione integer NOT NULL,
    fk_utente integer NOT NULL,
    quantita_spesa double precision NOT NULL,
    quantita_comprata double precision NOT NULL,
    valuta_comprata character(3) NOT NULL,
    data date NOT NULL
);
    DROP TABLE public.transizione;
       public         heap    postgres    false            ?            1259    134202    transizione_id_transizione_seq    SEQUENCE     ?   CREATE SEQUENCE public.transizione_id_transizione_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.transizione_id_transizione_seq;
       public          postgres    false    203            ?           0    0    transizione_id_transizione_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.transizione_id_transizione_seq OWNED BY public.transizione.id_transizione;
          public          postgres    false    202            ?            1259    134192    utente    TABLE     P  CREATE TABLE public.utente (
    id_utente integer NOT NULL,
    nome character varying(50) NOT NULL,
    cognome character varying(50) NOT NULL,
    email character varying(60) NOT NULL,
    password character(128) NOT NULL,
    iban character(27) NOT NULL,
    euro double precision NOT NULL,
    dollari double precision NOT NULL
);
    DROP TABLE public.utente;
       public         heap    postgres    false            ?            1259    134190    utente_id_utente_seq    SEQUENCE     ?   CREATE SEQUENCE public.utente_id_utente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.utente_id_utente_seq;
       public          postgres    false    201            ?           0    0    utente_id_utente_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.utente_id_utente_seq OWNED BY public.utente.id_utente;
          public          postgres    false    200            2           2604    134207    transizione id_transizione    DEFAULT     ?   ALTER TABLE ONLY public.transizione ALTER COLUMN id_transizione SET DEFAULT nextval('public.transizione_id_transizione_seq'::regclass);
 I   ALTER TABLE public.transizione ALTER COLUMN id_transizione DROP DEFAULT;
       public          postgres    false    203    202    203            1           2604    134195    utente id_utente    DEFAULT     t   ALTER TABLE ONLY public.utente ALTER COLUMN id_utente SET DEFAULT nextval('public.utente_id_utente_seq'::regclass);
 ?   ALTER TABLE public.utente ALTER COLUMN id_utente DROP DEFAULT;
       public          postgres    false    201    200    201            ?          0    134204    transizione 
   TABLE DATA           z   COPY public.transizione (id_transizione, fk_utente, quantita_spesa, quantita_comprata, valuta_comprata, data) FROM stdin;
    public          postgres    false    203   ?       ?          0    134192    utente 
   TABLE DATA           `   COPY public.utente (id_utente, nome, cognome, email, password, iban, euro, dollari) FROM stdin;
    public          postgres    false    201   ?       ?           0    0    transizione_id_transizione_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.transizione_id_transizione_seq', 6, true);
          public          postgres    false    202            ?           0    0    utente_id_utente_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.utente_id_utente_seq', 2, true);
          public          postgres    false    200            :           2606    134209    transizione transizione_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.transizione
    ADD CONSTRAINT transizione_pkey PRIMARY KEY (id_transizione);
 F   ALTER TABLE ONLY public.transizione DROP CONSTRAINT transizione_pkey;
       public            postgres    false    203            4           2606    134199    utente utente_email_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_email_key UNIQUE (email);
 A   ALTER TABLE ONLY public.utente DROP CONSTRAINT utente_email_key;
       public            postgres    false    201            6           2606    134201    utente utente_iban_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_iban_key UNIQUE (iban);
 @   ALTER TABLE ONLY public.utente DROP CONSTRAINT utente_iban_key;
       public            postgres    false    201            8           2606    134197    utente utente_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_pkey PRIMARY KEY (id_utente);
 <   ALTER TABLE ONLY public.utente DROP CONSTRAINT utente_pkey;
       public            postgres    false    201            ;           2606    134210 &   transizione transizione_fk_utente_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.transizione
    ADD CONSTRAINT transizione_fk_utente_fkey FOREIGN KEY (fk_utente) REFERENCES public.utente(id_utente);
 P   ALTER TABLE ONLY public.transizione DROP CONSTRAINT transizione_fk_utente_fkey;
       public          postgres    false    3128    203    201            ?   d   x?m?1?0C?Y???r?zO.?"[??$?P??'|?h?^Nێ?R?,!???N??^????衸?.??l]6|h?$??ը???? ??~??#?X????`u      ?     x?M?=k?1?g???E????k??]$Yn???k???H?p????h???????_?????;?^[??'i?WZ
??5\????0]???S??'[?Y?Hж?mq-??]ʓz?<iD??3???4????~?R$??'`???4m?yr?Wo/????[?????E?'}??*Yj?W??#Ma?(?E{IB?Sg?	??J?L?P.?#7???݋?g?	?s???t2T???'??  ٖ? G?	?A&<;?46??n??7????????o?     