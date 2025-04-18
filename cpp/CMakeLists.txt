cmake_minimum_required(VERSION 3.5)

project(libgeoda
    DESCRIPTION "GeoDa C++ library"
    LANGUAGES CXX
    VERSION 0.0.1
)

set(CMAKE_VERBOSE_MAKEFILE on)
set(CMAKE_CXX_STANDARD 14)
# allow compile C code
set(CMAKE_C_STANDARD 99)
# set CMAKE_C_COMPILE_OBJECT for CLAPACK, add -w to suppress all warnings from clapack
set(CMAKE_C_COMPILE_OBJECT "<CMAKE_C_COMPILER> <DEFINES> <INCLUDES> <FLAGS> -w -o <OBJECT> -c <SOURCE>")

# sources
include_directories(${CMAKE_SOURCE_DIR}/src)
add_subdirectory(src)

# add compile definitions to avoid BOOST deprecated functions BOOST_NO_CXX98_FUNCTION_BASE
add_compile_definitions(BOOST_NO_CXX98_FUNCTION_BASE)

# add compile definition to avoid error: integer value -1 is outside the valid range of values [0, 3] for this enumeration type [-Wenum-constexpr-conversion]
add_compile_options(-Wno-enum-constexpr-conversion)

# add compile flag "__NO_THREAD__"
add_definitions(-D__NO_THREAD__)

# library
include(FetchContent)
FetchContent_Declare(clapack
    URL https://github.com/hunter-packages/clapack/archive/refs/tags/v3.2.1.tar.gz
)
FetchContent_MakeAvailable(clapack)
FetchContent_GetProperties(clapack SOURCE_DIR CLAPACK_SRC_DIR)

# get source files from CLAPACK_SRC_DIR
file(GLOB CLAPACK_SRC
    ${CLAPACK_SRC_DIR}/SRC/dgesvd.c
    ${CLAPACK_SRC_DIR}/SRC/dgebrd.c
    ${CLAPACK_SRC_DIR}/SRC/ilaenv.c
    ${CLAPACK_SRC_DIR}/SRC/dgelss.c
    ${CLAPACK_SRC_DIR}/SRC/dgebak.c
    ${CLAPACK_SRC_DIR}/SRC/dgebal.c
    ${CLAPACK_SRC_DIR}/SRC/dgehd2.c
    ${CLAPACK_SRC_DIR}/SRC/dgehrd.c
    ${CLAPACK_SRC_DIR}/SRC/dgeev.c
    ${CLAPACK_SRC_DIR}/SRC/dgesv.c
    ${CLAPACK_SRC_DIR}/SRC/dgetf2.c
    ${CLAPACK_SRC_DIR}/SRC/dhseqr.c
    ${CLAPACK_SRC_DIR}/SRC/dlahqr.c
    ${CLAPACK_SRC_DIR}/SRC/dlahr2.c
    ${CLAPACK_SRC_DIR}/SRC/dlanv2.c
    ${CLAPACK_SRC_DIR}/SRC/dlaqr0.c
    ${CLAPACK_SRC_DIR}/SRC/dlaqr1.c
    ${CLAPACK_SRC_DIR}/SRC/dlaqr2.c
    ${CLAPACK_SRC_DIR}/SRC/dlaqr3.c
    ${CLAPACK_SRC_DIR}/SRC/dlaqr4.c
    ${CLAPACK_SRC_DIR}/SRC/dlaqr5.c
    ${CLAPACK_SRC_DIR}/SRC/dlaswp.c
    ${CLAPACK_SRC_DIR}/SRC/dorghr.c
    ${CLAPACK_SRC_DIR}/SRC/dormhr.c
    ${CLAPACK_SRC_DIR}/SRC/dspev.c
    ${CLAPACK_SRC_DIR}/SRC/dlansp.c
    ${CLAPACK_SRC_DIR}/SRC/dopgtr.c
    ${CLAPACK_SRC_DIR}/SRC/dorg2l.c
    ${CLAPACK_SRC_DIR}/SRC/dsptrd.c
    ${CLAPACK_SRC_DIR}/SRC/dsteqr.c
    ${CLAPACK_SRC_DIR}/SRC/dlae2.c
    ${CLAPACK_SRC_DIR}/SRC/dlaev2.c
    ${CLAPACK_SRC_DIR}/SRC/dlanst.c
    ${CLAPACK_SRC_DIR}/SRC/dgetrs.c
    ${CLAPACK_SRC_DIR}/SRC/dgetrf.c
    ${CLAPACK_SRC_DIR}/SRC/dgebd2.c
    ${CLAPACK_SRC_DIR}/SRC/dgelqf.c
    ${CLAPACK_SRC_DIR}/SRC/dgeqrf.c
    ${CLAPACK_SRC_DIR}/SRC/dlabrd.c
    ${CLAPACK_SRC_DIR}/SRC/dlacp.c
    ${CLAPACK_SRC_DIR}/SRC/dlamch.c
    ${CLAPACK_SRC_DIR}/SRC/dlang.c
    ${CLAPACK_SRC_DIR}/SRC/dlasc.c
    ${CLAPACK_SRC_DIR}/SRC/dlaset.c
    ${CLAPACK_SRC_DIR}/SRC/dorgb.c
    ${CLAPACK_SRC_DIR}/SRC/dorglq.c
    ${CLAPACK_SRC_DIR}/SRC/dbdsq.c
    ${CLAPACK_SRC_DIR}/SRC/dgelq2.c
    ${CLAPACK_SRC_DIR}/SRC/dgeqr2.c
    ${CLAPACK_SRC_DIR}/SRC/dbdsqr.c
    ${CLAPACK_SRC_DIR}/SRC/dlaba.c
    ${CLAPACK_SRC_DIR}/SRC/dlacpy.c
    ${CLAPACK_SRC_DIR}/SRC/dladiv.c
    ${CLAPACK_SRC_DIR}/SRC/dlabad.c
    ${CLAPACK_SRC_DIR}/INSTALL/dlamch.c
    ${CLAPACK_SRC_DIR}/SRC/dlange.c
    ${CLAPACK_SRC_DIR}/SRC/dlaln2.c
    ${CLAPACK_SRC_DIR}/SRC/dlarf.c
    ${CLAPACK_SRC_DIR}/SRC/dlarfb.c
    ${CLAPACK_SRC_DIR}/SRC/dlarfg.c
    ${CLAPACK_SRC_DIR}/SRC/dlarfp.c
    ${CLAPACK_SRC_DIR}/SRC/dlarft.c
    ${CLAPACK_SRC_DIR}/SRC/dlapy2.c
    ${CLAPACK_SRC_DIR}/SRC/dlartg.c
    ${CLAPACK_SRC_DIR}/SRC/dlas2.c
    ${CLAPACK_SRC_DIR}/SRC/dlascl.c
    ${CLAPACK_SRC_DIR}/SRC/dlasq1.c
    ${CLAPACK_SRC_DIR}/SRC/dlasr.c
    ${CLAPACK_SRC_DIR}/SRC/dlasq.c
    ${CLAPACK_SRC_DIR}/SRC/dlasv2.c
    ${CLAPACK_SRC_DIR}/SRC/dlaexc.c
    ${CLAPACK_SRC_DIR}/SRC/dlarfx.c
    ${CLAPACK_SRC_DIR}/SRC/dlasy2.c
    ${CLAPACK_SRC_DIR}/SRC/dorgbr.c
    ${CLAPACK_SRC_DIR}/SRC/dorgl2.c
    ${CLAPACK_SRC_DIR}/SRC/dorgqr.c
    ${CLAPACK_SRC_DIR}/SRC/dormbr.c
    ${CLAPACK_SRC_DIR}/SRC/dormlq.c
    ${CLAPACK_SRC_DIR}/SRC/dormqr.c
    ${CLAPACK_SRC_DIR}/SRC/drscl.c
    ${CLAPACK_SRC_DIR}/SRC/disnan.c
    ${CLAPACK_SRC_DIR}/SRC/dlasq2.c
    ${CLAPACK_SRC_DIR}/SRC/dlasrt.c
    ${CLAPACK_SRC_DIR}/SRC/dlaisnan.c
    ${CLAPACK_SRC_DIR}/SRC/dlasq3.c
    ${CLAPACK_SRC_DIR}/SRC/dlasq4.c
    ${CLAPACK_SRC_DIR}/SRC/dlasq5.c
    ${CLAPACK_SRC_DIR}/SRC/dlasq6.c
    ${CLAPACK_SRC_DIR}/SRC/dlassq.c
    ${CLAPACK_SRC_DIR}/SRC/dorg2r.c
    ${CLAPACK_SRC_DIR}/SRC/dorm2r.c
    ${CLAPACK_SRC_DIR}/SRC/dorml2.c
    ${CLAPACK_SRC_DIR}/SRC/dsterf.c
    ${CLAPACK_SRC_DIR}/SRC/dtrevc.c
    ${CLAPACK_SRC_DIR}/SRC/dtrexc.c
    ${CLAPACK_SRC_DIR}/SRC/ieeeck.c
    ${CLAPACK_SRC_DIR}/SRC/iladlc.c
    ${CLAPACK_SRC_DIR}/SRC/iladlr.c
    ${CLAPACK_SRC_DIR}/SRC/iparmq.c
    ${CLAPACK_SRC_DIR}/SRC/iparmq.c
    ${CLAPACK_SRC_DIR}/SRC/lsame.c
    ${CLAPACK_SRC_DIR}/SRC/xerbla.c
    ${CLAPACK_SRC_DIR}/SRC/lsamen.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/f77_aloc.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/d_sign.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/d_lg10.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/sfe.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/wsfe.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/pow_dd.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/pow_di.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/s_cat.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/s_cmp.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/s_copy.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/fio.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/fmt.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/sig_die.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/err.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/exit_.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/open.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/util.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/close.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/i_len.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/i_nint.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/endfile.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/wrtfmt.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/fmtlib.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/wref.c
    ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/ctype.c
    ${CLAPACK_SRC_DIR}/BLAS/SRC/daxpy.c
    ${CLAPACK_SRC_DIR}/BLAS/SRC/dcopy.c
    ${CLAPACK_SRC_DIR}/BLAS/SRC/dgemm.c
    ${CLAPACK_SRC_DIR}/BLAS/SRC/idamax.c
    ${CLAPACK_SRC_DIR}/BLAS/SRC/lsame.c
    ${CLAPACK_SRC_DIR}/BLAS/SRC/dgemv.c
    ${CLAPACK_SRC_DIR}/BLAS/SRC/dger.c
    ${CLAPACK_SRC_DIR}/BLAS/SRC/dnrm2.c
    ${CLAPACK_SRC_DIR}/BLAS/SRC/drot.c
    ${CLAPACK_SRC_DIR}/BLAS/SRC/dscal.c
    ${CLAPACK_SRC_DIR}/BLAS/SRC/ddot.c
    ${CLAPACK_SRC_DIR}/BLAS/SRC/dswap.c
    ${CLAPACK_SRC_DIR}/BLAS/SRC/dspmv.c
    ${CLAPACK_SRC_DIR}/BLAS/SRC/dspr2.c
    ${CLAPACK_SRC_DIR}/BLAS/SRC/dtrmm.c
    ${CLAPACK_SRC_DIR}/BLAS/SRC/dtrmv.c
    ${CLAPACK_SRC_DIR}/BLAS/SRC/dtrsm.c
)

# check if the first line of file ${CLAPACK_SRC_DIR}/INCLUDE/f2c.h is '#include <stdio.h>'
file(READ ${CLAPACK_SRC_DIR}/INCLUDE/f2c.h F2C_H_CONTENT)
if (NOT F2C_H_CONTENT MATCHES "#include <stdio.h>")
    message(STATUS "prepend line '#include <stdio.h>' at the beginning of file ${CLAPACK_SRC_DIR}/INCLUDE/f2c.h")
    # prepend line '#include <stdio.h>' at the beginning of file ${CLAPACK_SRC_DIR}/INCLUDE/f2c.h
    file(READ ${CLAPACK_SRC_DIR}/INCLUDE/f2c.h F2C_H_CONTENT)
    file(WRITE ${CLAPACK_SRC_DIR}/INCLUDE/f2c.h "#include <stdio.h>\n${F2C_H_CONTENT}")
endif()

# replace "void s_copy" with "integer s_copy" in file ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/s_copy.c
file(READ ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/s_copy.c S_COPY_C_CONTENT)
if (NOT S_COPY_C_CONTENT MATCHES "integer s_copy")
    message(STATUS "replace 'void s_copy' with 'integer s_copy' in file ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/s_copy.c")
    string(REPLACE "void s_copy" "integer s_copy" S_COPY_C_CONTENT "${S_COPY_C_CONTENT}")
    file(WRITE ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/s_copy.c "${S_COPY_C_CONTENT}")
endif()

# replace "s_cat(char *lp, char *rpp[], ftnint rnp[], ftnint *np, ftnlen ll)" with 
# "integer s_cat(char *lp, char *rpp[], ftnint rnp[], ftnint *np, ftnlen ll)" 
# in file ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/s_cat.c
file(READ ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/s_cat.c S_CAT_C_CONTENT)
if (S_CAT_C_CONTENT MATCHES " VOID")
    message(STATUS "replace 'void s_cat' with 'integer s_cat' in file ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/s_cat.c")
    string(REPLACE " VOID" " integer" S_CAT_C_CONTENT "${S_CAT_C_CONTENT}")
    file(WRITE ${CLAPACK_SRC_DIR}/F2CLIBS/libf2c/s_cat.c "${S_CAT_C_CONTENT}")
endif()


# print out CLAPACK_SRC_DIR
message(STATUS "CLAPACK_SRC_DIR: ${CLAPACK_SRC_DIR}")

# options
option(USE_EMCC "Emscripten" OFF)
if (USE_EMCC)
    add_subdirectory(wasm)
endif()

option(UNITTEST "CPP Test" ON)
if (UNITTEST)
    FetchContent_Declare(googletest
        URL https://github.com/google/googletest/archive/03597a01ee50ed33e9dfd640b249b4be3799d395.zip
    )
    # For Windows: Prevent overriding the parent project's compiler/linker settings
    #set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
    FetchContent_MakeAvailable(googletest)
    enable_testing()

    FetchContent_Declare(boost
        URL https://archives.boost.io/release/1.75.0/source/boost_1_75_0.tar.bz2
    )
    FetchContent_MakeAvailable(boost)
    FetchContent_GetProperties(boost SOURCE_DIR BOOST_SRC_DIR)
   
    include_directories(${CMAKE_SOURCE_DIR})
    add_subdirectory(test)
endif()